# -----------------------------
# STAGE 1: Build
# -----------------------------
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install system deps for Playwright and builds
RUN apk add --no-cache bash curl git libc6-compat

# Install pnpm globally
RUN npm install -g pnpm

# Copy package manifests
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the web app
RUN pnpm turbo run build --filter=web

# -----------------------------
# STAGE 2: Runtime
# -----------------------------
FROM node:20-alpine AS runtime

WORKDIR /app

# Install minimal deps for running Next.js
RUN apk add --no-cache bash libc6-compat curl

# Copy built files from builder stage
COPY --from=builder /app/apps/web/.next ./.next
COPY --from=builder /app/apps/web/public ./public
COPY --from=builder /app/apps/web/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Expose port
EXPOSE 3000

# Set dev environment
ENV NODE_ENV=development

# Start the app
CMD ["pnpm", "turbo", "run", "start", "--filter=web"]
