# Use official Node.js image as a build stage
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the NestJS project
RUN npm run build


# Use a smaller base image for the final stage
FROM node:18-alpine AS production

# Set the working directory inside the container
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./



# Expose the port that NestJS will run on
EXPOSE 3000

# Apply Prisma migrations before starting the application
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:prod"]