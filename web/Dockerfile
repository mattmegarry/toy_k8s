# Use an official Node runtime as a parent image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Make port 80 available to the world outside this container
EXPOSE 3456

# Define environment variable
ENV NODE_ENV production

# Run server.js when the container launches
CMD ["node", "server.js"]