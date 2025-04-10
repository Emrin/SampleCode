FROM node:23-alpine

# Install curl for health checks
RUN apk add --no-cache \
    curl \
    python3 \
    make \
    g++ \
    cairo-dev \
    pango-dev \
    libjpeg-turbo-dev \
    giflib-dev \
    pixman-dev \
    pangomm-dev \
    libtool \
    autoconf \
    automake

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm ci --loglevel verbose

# Files that are needed to run dev
COPY src ./src
COPY public ./public
COPY prisma ./prisma
COPY next.config.ts .
COPY postcss.config.mjs .
COPY tsconfig.json .

# .env file is added by docker compose
ENV NEXT_TELEMETRY_DISABLED 1
ENV DOCKER 1

# Note: Don't expose ports here, Compose will handle that for us

CMD npx prisma migrate dev && npx prisma db seed && npm run dev
#CMD npx prisma generate && npx prisma migrate deploy && npx prisma db seed && npm run dev
