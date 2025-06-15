# Use official Node.js LTS image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Create non-root user and set permissions
RUN useradd -ms /bin/bash appuser && \
    chown -R appuser:appuser /usr/src/app

# Copy the rest of the code
COPY . .

# Expose the app port
EXPOSE 5001

# Start the app
CMD ["npm", "run", "start"]