# Use the official Node.js image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application files to the container
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Define the command to run your application
CMD ["node", "server.js"]
