# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY .env.example .env
RUN npm install --production
RUN mkdir -p /public/images
COPY . .

# Stage 2: Runtime
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app /app
ENV NODE_ENV=production
EXPOSE 5000
CMD ["node", "index.js"]