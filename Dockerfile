# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Build args for env vars
ARG VITE_GH_OWNER
ARG VITE_GH_REPO
ARG VITE_GH_WEBHOOK_SECRET

ENV VITE_GH_OWNER=$VITE_GH_OWNER
ENV VITE_GH_REPO=$VITE_GH_REPO
ENV VITE_GH_WEBHOOK_SECRET=$VITE_GH_WEBHOOK_SECRET

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]