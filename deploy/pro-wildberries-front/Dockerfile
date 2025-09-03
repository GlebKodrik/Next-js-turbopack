ARG DOCKER_REGISTRY=harbor.wildberries.ru/devops/ci/base-images

FROM ${DOCKER_REGISTRY}/node:22-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./


RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci && npm install -g env-cmd; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG REFNAME
ARG APP_URL_PROD
ARG APP_URL_STAGE
ARG APP_URL_DEV
ARG CURRENT_ENV
ARG SERVICE_NAME

ENV NEXT_PUBLIC_APP_URL=""

RUN echo $REFNAME &&  \
    echo $CURRENT_ENV && \
    echo $APP_URL_DEV && \
    echo $SERVICE_NAME

RUN  echo "CURRENT_ENV = $CURRENT_ENV" && \
    if [ "${CURRENT_ENV}" = "feature" ] || [ "${CURRENT_ENV}" = "fix" ]; then \
        echo -e "\nNEXT_PUBLIC_APP_URL=http://${SERVICE_NAME}-${REFNAME}.${APP_URL_DEV}.k8s.dev-el/" >> .env.stage; \
        cat .env.stage; \
    elif [ "${CURRENT_ENV}" = "dev" ]; then \
        echo -e "\nNEXT_PUBLIC_APP_URL=http://${SERVICE_NAME}.${APP_URL_DEV}.k8s.dev-el/"  >> .env.stage; \
        cat .env.stage; \
     elif [ "${CURRENT_ENV}" = "stage" ]; then \
        echo -e "\nNEXT_PUBLIC_APP_URL=${APP_URL_STAGE}"  >> .env.stage; \
        cat .env.stage; \
    elif [ "${CURRENT_ENV}" = "prod" ]; then \
        echo -e "\nNEXT_PUBLIC_APP_URL=${APP_URL_PROD}" >> .env.prod; \
        cat .env.prod; \
    fi


RUN if [[ "$REFNAME" =~ ^v ]]; then \
      npm run build:prod; \
    else \
      npm run build:stage; \
    fi

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED=1

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
CMD HOSTNAME="0.0.0.0" BASE_PATH="" node server.js