# Step 1: Use official Node.js as the base image
FROM node:20-alpine

# Step 2: Set working directory inside container
WORKDIR /app

# Step 3: Copy package files and install only dependencies
COPY package*.json ./
RUN npm install --production

# Step 4: Copy the rest of your source code
COPY . .

# Step 5: Expose the port your app runs on (if 3000, use 3000)
EXPOSE 3000

# Step 6: Start the app
CMD ["node", "app.js"]
