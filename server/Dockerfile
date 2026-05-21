FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
# Install production dependencies only to keep image small
RUN npm install --only=production
COPY . .
EXPOSE 5000
# Start the server
CMD ["node", "server.js"]
