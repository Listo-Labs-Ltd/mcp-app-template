# syntax=docker/dockerfile:1.6

FROM node:20-bookworm-slim AS build

WORKDIR /app

# Use the same pnpm major as the repo.
RUN corepack enable && corepack prepare pnpm@10.13.1 --activate

# GitHub token for private packages (passed as build arg)
ARG GITHUB_TOKEN
ENV GITHUB_TOKEN=${GITHUB_TOKEN}

# Copy .npmrc first (needed for GitHub Packages auth)
COPY .npmrc ./

# Copy package files for dependency installation
COPY package.json pnpm-lock.yaml* ./

# Install root dependencies
RUN pnpm install --frozen-lockfile || pnpm install

# Server deps - copy .npmrc to server too for GitHub Packages
COPY server/package.json server/tsconfig.json server/
COPY .npmrc server/
RUN cd server && pnpm install

# Copy source files
COPY . .

# Build assets
RUN BASE_URL=/assets pnpm build


FROM node:20-bookworm-slim AS runner

WORKDIR /app
ENV NODE_ENV=production

# Copy runtime files
COPY --from=build /app/server /app/server
COPY --from=build /app/assets /app/assets

WORKDIR /app/server
ENV PORT=8000
EXPOSE 8000

CMD ["sh", "-c", "if [ -n \"$RAILWAY_PUBLIC_DOMAIN\" ]; then export TELEMETRY_BASE_URL=${TELEMETRY_BASE_URL:-https://$RAILWAY_PUBLIC_DOMAIN}; export ASSETS_BASE_URL=${ASSETS_BASE_URL:-https://$RAILWAY_PUBLIC_DOMAIN/assets}; export PUBLIC_BASE_URL=${PUBLIC_BASE_URL:-https://$RAILWAY_PUBLIC_DOMAIN}; fi; node --enable-source-maps node_modules/tsx/dist/cli.mjs src/server.ts"]
