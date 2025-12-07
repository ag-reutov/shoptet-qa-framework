# Get the official Playwright image (matches your Playwright version)
# We use 'jammy' (Ubuntu 22.04) which is standard
FROM mcr.microsoft.com/playwright:v1.49.0-jammy

# Set the working directory inside the container
WORKDIR /app

# Copy package files first (better caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of your project files
COPY . .

# Command to run when the container starts
# We run all tests by default
CMD ["npx", "playwright", "test"]