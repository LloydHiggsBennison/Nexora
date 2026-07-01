# Multi-stage Dockerfile for Angular Platform

# --- Base Stage ---
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci

# --- Development Stage ---
FROM base AS dev
COPY . .
EXPOSE 4200
# Run ng serve with host binding and polling for volume mounts
CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--poll", "2000"]

# --- Build Stage ---
FROM base AS builder
COPY . .
RUN npm run build -- --configuration production

# --- Production Stage ---
FROM nginx:1.25-alpine AS prod
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy built assets
COPY --from=builder /app/dist/platform/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
