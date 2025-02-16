# Use Node.js 20 as the base image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy only essential files for production
COPY package.json package-lock.json ./

# Install dependencies in production mode
RUN npm ci --omit=dev

# Copy only required source files (excluding unnecessary ones)
COPY public ./public
COPY app ./app
COPY next.config.ts ./
COPY tailwind.config.ts ./
COPY postcss.config.mjs ./
COPY tsconfig.json ./
COPY .env.production ./

# Copy the built .next folder (make sure to run `npm run build` before building the Docker image)
COPY .next ./.next

# Expose the application port
EXPOSE 3000

# Set environment variable for API URL
ENV NEXT_PUBLIC_API_URL=https://content-reviewer-backend-91734819578.europe-west2.run.app

# Start the Next.js app in production mode
CMD ["npm", "run", "start"]
