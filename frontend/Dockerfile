# Use the official Node.js 18 image based on Alpine Linux.
# Alpine images are lightweight compared to other base images.
FROM node:18-alpine 

# Set the working directory in the container to /app.
# This will be the directory where your app lives in the container.
WORKDIR /app

# Copy the package.json and package-lock.json files to our app directory in the container.
# This is done before copying the entire project or installing dependencies 
# to utilize Docker's caching mechanism and avoid npm install on every build.
COPY package.json package-lock.json ./

# Install the npm packages as defined in package-lock.json.
# Using `npm ci` provides faster, more reliable builds for production.
RUN npm ci

# Copy the entire project to the working directory in the container.
COPY . .

# Inform Docker that the container listens on the specified network port at runtime.
# In this case, the app presumably runs on port 3000.
EXPOSE 3000
