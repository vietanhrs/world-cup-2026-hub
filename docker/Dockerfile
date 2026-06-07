FROM oven/bun:1.3.14-alpine AS builder

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

ARG IMAGE_TAG_ARG=m-default
ENV VITE_APP_VERSION=${IMAGE_TAG_ARG}

COPY . ./
RUN bun run build

FROM nginx:1.27-alpine

COPY --from=builder /app/dist /app/www
COPY --from=builder /app/etc/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
