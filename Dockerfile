# Use the official Node.js image as a parent image
FROM node:18.4.0-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN yarn install

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN yarn build

# Expose the port on which your application will run
EXPOSE 3000

# Start your application
CMD ["yarn", "start"]
