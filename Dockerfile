# ----------------------------
# Stage 1: Build the application
# ----------------------------
FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies (including devDeps for building)
COPY package*.json ./
RUN npm install --production=false   
# install all, we'll prune later :contentReference[oaicite:0]{index=0}

# Copy source code and compile
COPY . .
RUN npm run build                    
# outputs to ./dist :contentReference[oaicite:1]{index=1}

# ----------------------------
# Stage 2: Create production image
# ----------------------------
FROM node:18-alpine
WORKDIR /app

# Set production environment
ENV NODE_ENV=production              
# smaller footprint, optimizations enabled :contentReference[oaicite:2]{index=2}

# Copy only the production dependencies and compiled output
COPY --from=builder /app/package*.json ./
RUN npm prune --production           
# remove devDependencies :contentReference[oaicite:3]{index=3}

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Expose application port
EXPOSE 3000                          
# match Nest default :contentReference[oaicite:4]{index=4}

# Run the compiled NestJS application
CMD ["node", "dist/main.js"]         
# entrypoint for production :contentReference[oaicite:5]{index=5}
