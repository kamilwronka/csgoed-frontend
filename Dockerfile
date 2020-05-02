FROM node:14.1.0-alpine as build-deps

ENV NODE_ENV=production

ARG REACT_APP_API_URL
ARG REACT_APP_STRIPE_KEY

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