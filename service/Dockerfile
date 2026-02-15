# ---------- build stage ----------
FROM node:22-slim AS builder
WORKDIR /usr/app

# Copy workspace root files needed for install
COPY package.json yarn.lock .yarnrc.yml tsconfig.base.json ./
COPY .yarn .yarn

# Copy only the packages this service depends on
COPY packages/express-app/package.json packages/express-app/
COPY service/package.json service/

# Install all workspace dependencies (immutable = frozen lockfile for Yarn 3)
RUN yarn install --immutable

# Copy full source for the dependency package and this service
COPY packages/express-app packages/express-app
COPY service service

# Build the dependency first, then the service
RUN yarn workspace @dhruv-m-patel/express-app run build
RUN yarn workspace service run build

# ---------- production stage ----------
FROM node:22-slim AS production
WORKDIR /usr/app

ENV NODE_ENV=production

# Copy workspace root files
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn .yarn

# Copy built artifacts and package.json for each workspace
COPY --from=builder /usr/app/packages/express-app/package.json packages/express-app/
COPY --from=builder /usr/app/packages/express-app/build packages/express-app/build
COPY --from=builder /usr/app/service/package.json service/
COPY --from=builder /usr/app/service/build service/build

# Install production dependencies only
RUN yarn workspaces focus service --production

EXPOSE 4000

CMD ["node", "service/build/index.js"]
