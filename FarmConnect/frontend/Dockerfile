# Stage 1 - Base: General Configuration
FROM node:22-alpine AS base
WORKDIR /usr/src/app

# Environment setup and global tools installation
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=/home/node/.npm-global/bin:$PATH

# Install necessary tools and global npm packages
RUN apk add --no-cache bash git \
    && npm i --unsafe-perm -g npm@latest expo-cli@latest \
    && apk del git

# React Native Packager variable for development
ARG REACT_NATIVE_PACKAGER_HOSTNAME
ENV REACT_NATIVE_PACKAGER_HOSTNAME=$REACT_NATIVE_PACKAGER_HOSTNAME

# Stage 2 - Dependencies: Install project dependencies
FROM base AS dependencies
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./ 
RUN npm ci --prefer-offline --no-audit

# Copy the rest of the project files
COPY . ./

# Stage 3 - Build: Compile TypeScript and prepare build artifacts
FROM dependencies AS build
WORKDIR /usr/src/app

# Copy source code and run the build process
COPY . ./
RUN npm run build

# Stage 4 - Development: Configure development environment
FROM dependencies AS development
WORKDIR /usr/src/app

# Copy node_modules and source code from the dependencies stage
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY . ./

# Expose development-related ports (Expo)
EXPOSE 19000 19001 19002 19003 19006 8081

# Command to start the development server
CMD ["npx", "expo", "start", "--lan"]

# Stage 5 - Testing: Run automated tests
# Uncomment and configure if testing is required
# FROM dependencies AS test
# WORKDIR /usr/src/app
# COPY . ./
# RUN npm run test

# Stage 6 - Production: Run the optimized application
FROM node:22-slim AS production
WORKDIR /usr/src/app

# Install only production dependencies
COPY package*.json ./
RUN npm ci --production --prefer-offline --no-audit

# Copy the compiled build artifacts from the build stage
COPY --from=build /usr/src/app/dist ./dist

# Expose the application port for production
EXPOSE 3000

# Command to start the production server
CMD ["node", "dist/index.js"]