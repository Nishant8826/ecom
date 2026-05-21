# Comprehensive DevOps Deployment Guide for Ecommerce App

Welcome to your DevOps journey! As a Senior DevOps Engineer and Mentor, I've designed this guide to take you from a complete beginner to deploying your ecommerce application like a pro. 

We will learn by doing. We will use **your** specific MERN stack project (React/Vite frontend + Node/Express backend + MongoDB) to learn AWS, Docker, Kubernetes, Jenkins, and Monitoring.

---

## 1. Project Analysis

Before deploying, a DevOps engineer must understand the application.

### Frontend Analysis (client/)
- **Tech Stack:** React, Vite, TailwindCSS, Redux Toolkit.
- **Port:** Runs locally on `5173`, but in production, we build static files and serve them via NGINX on port `80`.
- **Environment Variables:** `VITE_STRIPE_PK` (Stripe Public Key), `VITE_BASE_URL` (Backend API URL).
- **Build Command:** `npm run build` generates a `dist/` folder containing static HTML/CSS/JS.

### Backend Analysis (server/)
- **Tech Stack:** Node.js, Express, Mongoose, Cloudinary, Stripe, JWT.
- **Port:** Runs on `5000`.
- **Environment Variables:** `MONGO_URI`, `CLOUDINARY_*`, `STRIPE_*`, `JWT_SECRET`, `FrontendUrl`, etc.
- **Start Command:** `node server.js`
- **Database Setup:** MongoDB Atlas (external managed database), connected via `MONGO_URI`.

### Production Challenges
1. **State Management:** The backend must be stateless so we can run multiple copies (scaling). JWT handles this well!
2. **Environment Variables:** We cannot hardcode keys like `MONGO_URI`. We will inject them securely using Kubernetes Secrets.
3. **CORS:** The backend must accept requests from the frontend's production domain.
4. **Image Uploads:** Handled via Cloudinary, meaning we don't need local disk storage (Persistent Volumes) for images, making scaling much easier!

> **Beginner Note:** Always ensure your frontend talks to the backend using an environment variable (like `VITE_BASE_URL`) so you can change it without editing code.

---

## 2. DevOps Architecture Diagram

Here is how traffic flows from a user to your application in production:

```text
       [ USER (Browser) ]
              | (HTTPS / Port 443)
              v
[ Route53 (DNS: yourdomain.com) ]
              |
              v
     [ AWS Load Balancer ]
              |
              v
[ Kubernetes NGINX Ingress Controller ] --> Routes traffic based on URL
              |
   +----------+-----------+
   | ( / )                | ( /api )
   v                      v
[ Frontend Pods ]      [ Backend Pods ]
(NGINX serving Vite)   (Node.js Express)
   |                      |
   |                      +---> [ MongoDB Atlas ]
   |                      +---> [ Cloudinary ]
   |                      +---> [ Stripe ]
   |
[ Prometheus & Grafana ] <-- Monitoring all Pods
```

---

## 3. AWS Setup

**What it is:** AWS (Amazon Web Services) provides the cloud servers (EC2) where we will install Kubernetes.

**Why we use it:** Instead of buying physical computers, we rent them per hour. 

### Key Concepts
- **EC2 (Elastic Compute Cloud):** A virtual server. We will use Ubuntu Linux EC2 instances.
- **VPC (Virtual Private Cloud):** Your private network in AWS. 
- **Public vs Private Subnet:** 
  - *Public Subnet:* Has internet access (Load Balancers go here).
  - *Private Subnet:* No direct internet access (Backend/Databases go here for security).
- **Security Groups:** A virtual firewall. You define rules (e.g., "Allow port 80 for HTTP", "Allow port 22 for SSH").
- **Bastion Host (Jumpbox):** A highly secure EC2 instance in a public subnet. We SSH into the Bastion, and from there, we SSH into our private servers. 
  - *Why:* We don't expose our actual application servers to the internet directly.

### Steps to setup:
1. Launch 3 EC2 instances (1 Cloud Workstation/Bastion, 1 Kubernetes Master, 1 Kubernetes Worker).
2. Create an Elastic IP (static public IP) for the Cloud Workstation.
3. Allow port `22` (SSH) only from your IP, and ports `80`/`5000`/`5173`/`8080` for testing apps and Jenkins.
4. **Zero Local Install Rule:** We will SSH into the Cloud Workstation and install **everything** (Docker, Git, Jenkins, `kubectl`) there. Your physical laptop remains completely clean!

---

## 4. Cloud Workstation Provisioning (Installing Tools First!)

Because we are using a **Zero Local Install** approach, your first step after launching the Bastion/Workstation EC2 instance is to install every tool you'll need. SSH into your instance (`ssh -i key.pem ubuntu@<IP>`) and run these exact commands:

### A. Install Docker & Git
```bash
sudo apt update
sudo apt install docker.io git docker-compose-v2 -y
sudo usermod -aG docker ubuntu
newgrp docker # Apply permissions immediately
```

### B. Install Java & Jenkins
Jenkins requires Java to run.
```bash

# Install Java
sudo apt install openjdk-21-jdk -y

# Add Jenkins repository
sudo wget -O /etc/apt/keyrings/jenkins-keyring.asc https://pkg.jenkins.io/debian-stable/jenkins.io-2026.key
echo "deb [signed-by=/etc/apt/keyrings/jenkins-keyring.asc]" https://pkg.jenkins.io/debian-stable binary/ | sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null

# Update package list and install Jenkins
sudo apt update
sudo apt install jenkins -y

# Start Jenkins (start at boot)
sudo systemctl enable --now jenkins
```

### C. Install kubectl & Helm (For Kubernetes)
```bash
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
bash get_helm.sh
```

### D. Verify All Installations
Run these commands to confirm everything is installed and running correctly:
```bash
# Docker & Git
docker --version
git --version
docker compose version

# Java & Jenkins
java -version
sudo systemctl status jenkins

# Kubernetes Tools
kubectl version
helm version
```

> **Beginner Note:** Now your Cloud Workstation is fully equipped! You have Docker (for containers), Jenkins (for CI/CD), and kubectl/Helm (for K8s).

---

## 5. Docker

**What it is:** A tool to package your app and its dependencies into a single box called a "Container".
**Why we use it:** "It works on my machine" problem solver. If a container runs on your Cloud Workstation, it runs exactly the same in production.

### Dockerfile for Frontend (`client/Dockerfile`)
We use a **Multi-stage build** here. Stage 1 builds the Vite app (requires heavy Node.js). Stage 2 serves the static files (requires lightweight NGINX).

```dockerfile
# Stage 1: Build the React application
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# We must pass the base URL during build for Vite
ARG VITE_BASE_URL
ENV VITE_BASE_URL=$VITE_BASE_URL
RUN npm run build

# Stage 2: Serve with NGINX
FROM nginx:alpine
# Copy built files from the previous stage
COPY --from=builder /app/dist /usr/share/nginx/html
# Expose port 80 for NGINX
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Dockerfile for Backend (`server/Dockerfile`)

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
# Install production dependencies only to keep image small
RUN npm install --only=production
COPY . .
EXPOSE 5000
# Start the server
CMD ["node", "server.js"]
```
### Dockerignore files (`.dockerignore`)
**Crucial for Security and Performance!** Create a `.dockerignore` file in both the `client/` and `server/` directories. This prevents sensitive files (like `.env`) from being accidentally copied into your Docker image (which could expose your API keys), and speeds up the build by ignoring large folders like `node_modules`.

```text
node_modules
npm-debug.log
.env
.git
.gitignore
Dockerfile
.dockerignore
dist
build
```

### Docker Compose (`docker-compose.yml`)
Used for local testing to run both frontend and backend together.

```yaml
version: '3.8'
services:
  backend:
    build: ./server
    ports:
      - "5000:5000"
    env_file:
      - ./server/.env
    networks:
      - ecom-network

  frontend:
    build: 
      context: ./client
      args:
        - VITE_BASE_URL=http://localhost:5000
    ports:
      - "5173:80" # Maps local 5173 to container's NGINX 80
    depends_on:
      - backend
    networks:
      - ecom-network

networks:
  ecom-network:
    driver: bridge
```

---

## 6. Cloud Workstation Deployment (Zero Local Setup)

Since we already installed Docker in **Section 4**, you just need to SSH into your Cloud Workstation and clone your code.

```bash
# SSH into your EC2 instance
ssh -i key.pem ubuntu@<Workstation-IP>

# Clone your project
git clone https://github.com/your-username/ecommerce.git
cd ecommerce
```

**Commands to test on the Cloud Workstation:**
1. `docker compose build` (Builds the images on the EC2 server)
2. `docker compose up -d` (Runs them in the background)
3. `docker ps` (Lists running containers)

**Verification:** Open `http://<Workstation-Public-IP>:5173` in your browser. You should see your frontend communicating with the backend!
**Debugging:** If it fails, run `docker compose logs -f backend` to see backend errors.

---

## 7. CI/CD Concepts

- **CI (Continuous Integration):** Whenever a developer pushes code to GitHub, an automated system builds the code and runs tests.
- **CD (Continuous Deployment):** If CI passes, the automated system deploys the new code to servers automatically.

**Real Company Workflow:**
Developer pushes to `main` branch -> Jenkins detects change -> Jenkins builds Docker images -> Jenkins pushes images to DockerHub -> Jenkins updates Kubernetes to use the new image.

---

## 8. Jenkins Setup

**What it is:** An automation server that runs our CI/CD pipelines.

**Accessing Jenkins:**
Since we already installed Jenkins via the script in **Section 4**, it is now running in the background. Open your browser and navigate to the Jenkins UI via `http://<Workstation-Public-IP>:8080`.

**Jenkinsfile (Project Root):**
Create a file named `Jenkinsfile` at the root.

```groovy
pipeline {
    agent any
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-id')
        APP_VERSION = "v${env.BUILD_ID}"
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build Backend') {
            steps {
                dir('server') {
                    sh 'docker build -t yourusername/ecom-backend:${APP_VERSION} .'
                }
            }
        }
        stage('Build Frontend') {
            steps {
                dir('client') {
                    sh 'docker build --build-arg VITE_BASE_URL=https://api.yourdomain.com -t yourusername/ecom-frontend:${APP_VERSION} .'
                }
            }
        }
        stage('Push Images') {
            steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                sh 'docker push yourusername/ecom-backend:${APP_VERSION}'
                sh 'docker push yourusername/ecom-frontend:${APP_VERSION}'
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                // Update Kubernetes deployments with the new image tag
                sh "sed -i 's/APP_VERSION/${APP_VERSION}/g' k8s/backend-deployment.yaml"
                sh "sed -i 's/APP_VERSION/${APP_VERSION}/g' k8s/frontend-deployment.yaml"
                sh "kubectl apply -f k8s/"
            }
        }
    }
}
```

> **Beginner Note:** Jenkins securely stores your DockerHub passwords using the "Credentials" feature, so they are never hardcoded in the script.

---

## 9. Kubernetes Fundamentals

**What it is:** A container orchestration tool. If Docker runs 1 container, Kubernetes manages 1,000 containers across 10 servers.

- **Pod:** The smallest unit in K8s. It runs your Docker container.
- **Deployment:** Manages Pods. It ensures exactly X number of Pods are always running. If a Pod crashes, Deployment restarts it.
- **Service:** A stable IP address for your Pods. Pod IPs change when they restart; Service IPs do not.
- **ConfigMap / Secrets:** Stores environment variables securely.
- **Ingress:** The front door. Routes external HTTP traffic (e.g., yourdomain.com) to internal Services.
- **Namespace:** A virtual cluster. (e.g., `dev`, `staging`, `production`).

---

## 10. Kubernetes Deployment (YAMLs)

Create a folder `k8s/` and add these files.

### 1. namespace.yaml
```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: ecom-production
```

### 2. secrets.yaml
*(Base64 encode your values: `echo -n "your_secret" | base64`)*
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: ecom-secrets
  namespace: ecom-production
type: Opaque
data:
  MONGO_URI: bW9uZ29kYitzcnY6Ly8uLi4= 
  JWT_SECRET: c2VjcmV0 
  STRIPE_KEY: c2tf...
```

### 3. backend-deployment.yaml
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
  namespace: ecom-production
spec:
  replicas: 2 # Run 2 copies for high availability
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
      - name: backend
        image: yourusername/ecom-backend:APP_VERSION
        ports:
        - containerPort: 5000
        envFrom:
        - secretRef: # Inject all secrets as Env Vars
            name: ecom-secrets
---
apiVersion: v1
kind: Service
metadata:
  name: backend-service
  namespace: ecom-production
spec:
  selector:
    app: backend
  ports:
    - protocol: TCP
      port: 5000
      targetPort: 5000
```

### 4. frontend-deployment.yaml
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
  namespace: ecom-production
spec:
  replicas: 2
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
      - name: frontend
        image: yourusername/ecom-frontend:APP_VERSION
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: frontend-service
  namespace: ecom-production
spec:
  selector:
    app: frontend
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
```

### 5. ingress.yaml
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ecom-ingress
  namespace: ecom-production
  annotations:
    kubernetes.io/ingress.class: nginx
spec:
  rules:
  - host: ecom.yourdomain.com
    http:
      paths:
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: backend-service
            port:
              number: 5000
      - path: /
        pathType: Prefix
        backend:
          service:
            name: frontend-service
            port:
              number: 80
```

---

## 11. Monitoring

**Why it matters:** In production, you need to know if CPU is hitting 100% before the server crashes.
- **Prometheus:** Scrapes and stores metrics (CPU, RAM usage).
- **Grafana:** Connects to Prometheus and draws beautiful graphs and dashboards.

**Setup in K8s:**
Industry standard is using Helm (package manager for K8s):
```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install prometheus prometheus-community/kube-prometheus-stack -n monitoring --create-namespace
```

---

## 12. Production Best Practices

- **HTTPS / SSL:** Use `cert-manager` in Kubernetes to automatically generate free Let's Encrypt SSL certificates.
- **Rolling Updates:** Kubernetes does this by default. When you deploy a new version, it starts a new Pod, waits for it to be ready, then kills the old Pod. Zero downtime!
- **Resource Limits:** Always define CPU/Memory limits in your YAMLs so one bad Pod doesn't crash the whole Node.
  ```yaml
  resources:
    limits:
      memory: "512Mi"
      cpu: "500m"
  ```
- **Horizontal Pod Autoscaling (HPA):** K8s can automatically increase `replicas` from 2 to 10 if CPU usage goes above 80% during a Black Friday sale.

---

## 13. Debugging Section

When things go wrong, use these commands:

1. **Pod is crashing repeatedly (CrashLoopBackOff)?**
   - Check logs: `kubectl logs <pod-name> -n ecom-production`
   - *Why it happens:* Often a missing environment variable or bad MongoDB connection string.
2. **Pod shows ImagePullBackOff?**
   - Describe pod: `kubectl describe pod <pod-name> -n ecom-production`
   - *Why it happens:* K8s cannot download your Docker image. Check if image name is correct or if it's private and K8s lacks credentials.
3. **Jenkins Pipeline failed?**
   - Go to Jenkins UI -> Click Pipeline -> Console Output. Read from the bottom up!

---

## 14. Cost Optimization

- **Right-sizing:** Don't use a massive `t3.large` if your app uses 200MB RAM. Start small (`t3.micro`) and scale out (more small instances) rather than scaling up (one massive instance).
- **Spot Instances:** Use AWS Spot Instances for Worker Nodes to save up to 70% on EC2 costs.
- **Cleanup:** Unused Docker images eat disk space. Set up a cron job to run `docker system prune -af`.

---

## 15. Learning Roadmap

**Beginner:**
1. Master Linux commands & SSH.
2. Provision a Cloud Workstation on AWS and install Docker/Git.
3. Containerize apps directly on your Cloud Workstation using Docker & docker compose.

**Intermediate:**
1. Write Jenkins pipelines to automate deployments.
2. Learn basic Kubernetes (Deployments, Services).
3. Buy a domain and configure NGINX Reverse Proxy and SSL manually.

**Advanced:**
1. Manage K8s with Helm.
2. Write Terraform to create your AWS VPCs and EC2s automatically.
3. Implement Prometheus Alertmanager (e.g., get Slack pings when DB goes down).

***

**Final Note to Student:** DevOps is about solving problems iteratively. Don't copy-paste these commands without reading them. Understand the *why*, and you'll be a Senior DevOps Engineer in no time!
