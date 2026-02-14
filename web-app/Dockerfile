# ---------- build stage ----------
FROM node:22-slim AS builder
WORKDIR /usr/app

# Copy workspace root files needed for install
COPY package.json yarn.lock .yarnrc.yml tsconfig.base.json ./
COPY .yarn .yarn

# Copy only the packages this app depends on
COPY packages/express-app/package.json packages/express-app/
COPY packages/react-components/package.json packages/react-components/
COPY web-app/package.json web-app/

# Install all workspace dependencies
RUN yarn install --immutable

# Copy full source for dependency packages and the web app
COPY packages/express-app packages/express-app
COPY packages/react-components packages/react-components
COPY web-app web-app

# Build dependencies first, then the web app (client + SSR server bundles)
RUN yarn workspace @dhruv-m-patel/express-app run build
RUN yarn workspace @dhruv-m-patel/react-components run build
RUN yarn workspace web-app run build

# ---------- production stage ----------
FROM node:22-slim AS production
WORKDIR /usr/app

# Copy workspace root files for install
COPY package.json yarn.lock .yarnrc.yml tsconfig.base.json ./
COPY .yarn .yarn

# Copy package.json for each workspace needed at runtime
COPY packages/express-app/package.json packages/express-app/
COPY packages/react-components/package.json packages/react-components/
COPY web-app/package.json web-app/

# Install production dependencies only
RUN yarn workspaces focus web-app --production

# Copy built artifacts
COPY --from=builder /usr/app/packages/express-app/build packages/express-app/build
COPY --from=builder /usr/app/packages/react-components/build packages/react-components/build
COPY --from=builder /usr/app/web-app/dist web-app/dist
COPY --from=builder /usr/app/web-app/src web-app/src

EXPOSE 3000

# Run the SSR server via tsx (reads NODE_ENV to serve pre-built assets)
ENV NODE_ENV=production
CMD ["yarn", "workspace", "web-app", "run", "start"]
