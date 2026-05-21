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
# Copy our custom NGINX configuration to fix 404 errors on refresh
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy built files from the previous stage
COPY --from=builder /app/dist /usr/share/nginx/html
# Expose port 80 for NGINX
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
