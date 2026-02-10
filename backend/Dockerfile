# Use a Node.js LTS (Long Term Support) image as the base.
# We choose a slim variant for a smaller image size, suitable for production.
FROM node:20-slim as base

# Set the working directory inside the container
WORKDIR /app

# --- Dependency Installation Stage ---
FROM base as dependencies

# Copy package.json and package-lock.json first to leverage Docker's cache.
# This step is only re-run if these files change.
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# --- Build Stage (if any transpilation or build steps were needed for backend, which is less common for pure Node.js APIs) ---
# For a typical Node.js backend, this stage might be minimal or combined.
# Including it for completeness if you later add TypeScript or other build steps.
FROM base as build

COPY package*.json ./
RUN npm ci

# Copy the rest of the application source code
COPY . .

# If you had a build script (e.g., for TypeScript), you'd run it here:
# RUN npm run build

# --- Production Stage ---
FROM base as production

# Copy only the necessary files from the dependency stage and build stage
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=build /app .

# Set environment variables for production
ENV NODE_ENV=production
ENV PORT=5000

# Expose the port the application runs on
EXPOSE 5000

# Start the application
CMD ["node", "server.js"]

