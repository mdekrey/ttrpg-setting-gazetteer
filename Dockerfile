
FROM node:18-alpine AS build-node
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /src

COPY ui/package.json ui/package-lock.json ./
RUN npm ci

COPY ui/ .

# Disable Astro telemetry
ENV ASTRO_TELEMETRY_DISABLED=1

ARG DOMAIN=https://setting.dekrey.net
RUN npm run build -- --site $DOMAIN

FROM ghcr.io/mdekrey/static-files-server
COPY --from=build-node /src/dist ./wwwroot

ARG GIT_HASH=HEAD
RUN echo $GIT_HASH > ./wwwroot/git-version.txt
