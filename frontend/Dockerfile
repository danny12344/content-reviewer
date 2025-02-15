# Use Node.js as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies using npm
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 5001

# Start the application
CMD ["npm", "run", "start"]
