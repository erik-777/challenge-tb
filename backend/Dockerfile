ARG NODE_VERSION=14.21.3
ARG PORT=3001
ARG NODE_ENV=development
ARG TZ=America/Bogota

FROM node:${NODE_VERSION}

RUN mkdir -p /app/node_modules

RUN mkdir -p /app/public

WORKDIR /app

COPY package*.json ./

RUN apt update && npm install

COPY . .

ENV PORT=${PORT}
ENV NODE_ENV=${NODE_ENV}

# Timezone
ENV TZ=${TZ}

#EXPOSE
EXPOSE ${PORT}

CMD ["node", "app.js"]