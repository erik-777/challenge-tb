ARG NODE_VERSION=19.1.0

FROM node:${NODE_VERSION} AS build

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

ENV VITE_API_URL={{VITE_API_URL}}

FROM nginx:alpine

COPY --from=build /app/front.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 3131