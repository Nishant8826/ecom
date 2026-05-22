pipeline {
    agent any
    environment {
        // These are your dynamic variables!
        // DOCKERHUB_CREDENTIALS must match the ID of the credential you create in the Jenkins UI
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-id')
        APP_VERSION = "v${env.BUILD_ID}"
        
        // Let's extract the hardcoded values into dynamic variables here to make it easier for you!
        DOCKER_USERNAME = "rnishant428" // Replace with your actual DockerHub username
        // API_URL = "http://[IP_ADDRESS]" // Replace with your actual production backend URL
        API_URL = "http://65.0.30.22" // Updated: Added /api to match the Ingress routing!
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
                    sh 'docker build -t ${DOCKER_USERNAME}/ecom-backend:${APP_VERSION} .'
                }
            }
        }
        stage('Build Frontend') {
            steps {
                dir('client') {
                    sh 'docker build --build-arg VITE_BASE_URL=${API_URL} -t ${DOCKER_USERNAME}/ecom-frontend:${APP_VERSION} .'
                }
            }
        }
        stage('Push Images') {
            steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                sh 'docker push ${DOCKER_USERNAME}/ecom-backend:${APP_VERSION}'
                sh 'docker push ${DOCKER_USERNAME}/ecom-frontend:${APP_VERSION}'
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                // Update Kubernetes deployments with the new image tag
                sh "sed -i 's/APP_VERSION/${APP_VERSION}/g' k8s/backend-deployment.yaml"
                sh "sed -i 's/APP_VERSION/${APP_VERSION}/g' k8s/frontend-deployment.yaml"
                
                // CRITICAL: Apply the namespace first before applying files that depend on it!
                sh "kubectl apply -f k8s/namespace.yaml"
                sh "kubectl apply -f k8s/"
            }
        }
    }
}
