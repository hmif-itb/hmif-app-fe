FROM node:18-alpine AS build
  WORKDIR /app
  RUN corepack enable
  COPY pnpm-lock.yaml package.json ./
  RUN pnpm i --frozen-lockfile
  COPY . .
  ARG VITE_API_URL
  ARG VITE_GOOGLE_CLIENT_ID
  ARG VITE_VAPID_KEY
  ENV VITE_API_URL=$VITE_API_URL \
      VITE_GOOGLE_CLIENT_ID=$VITE_GOOGLE_CLIENT_ID \
      VITE_VAPID_KEY=$VITE_VAPID_KEY
  RUN pnpm run build

  FROM caddy:2-alpine
  COPY --from=build /app/dist /srv
  RUN printf ':3000 {\n  root * /srv\n  try_files {path} /index.html\n  file_server\n}' > /etc/caddy/Caddyfile
  EXPOSE 3000
