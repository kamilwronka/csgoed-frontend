FROM node:12.16-alpine as build-deps

ARG API_URL

ENV API_URL=${API_URL}
ENV NODE_ENV=production

WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

#Stage 2

FROM nginx:1.17.5-alpine
COPY --from=build-deps /usr/src/app/build /var/www
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]