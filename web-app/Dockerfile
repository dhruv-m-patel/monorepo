# ---------- build stage ----------
FROM node:22-slim AS builder
WORKDIR /usr/app

# Copy workspace root files needed for install
COPY package.json yarn.lock .yarnrc.yml tsconfig.base.json ./
COPY .yarn .yarn

# Copy only the packages this app depends on
COPY packages/react-components/package.json packages/react-components/
COPY web-app/package.json web-app/

# Install all workspace dependencies
RUN yarn install --immutable

# Copy full source for the dependency package and the web app
COPY packages/react-components packages/react-components
COPY web-app web-app

# Build the dependency first, then the web app (produces static files in web-app/dist/)
RUN yarn workspace @dhruv-m-patel/react-components run build
RUN yarn workspace web-app run build

# ---------- production stage ----------
FROM node:22-slim AS production

RUN npm install -g serve@14

COPY --from=builder /usr/app/web-app/dist /usr/app/dist

EXPOSE 3000

CMD ["serve", "-s", "/usr/app/dist", "-l", "3000"]
