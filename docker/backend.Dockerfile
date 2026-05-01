FROM node:20-slim

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy source
COPY src/ ./src/

EXPOSE 4000
ENV PORT=4000
ENV NODE_ENV=production

# Run
CMD ["node", "src/index.js"]
