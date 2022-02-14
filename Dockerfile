# *** The Build Environment ***
# pull official base image
FROM node:lts-alpine as build

# set working directory
WORKDIR /usr

# install app dependencies
COPY package.json ./
# COPY package-lock.json ./
COPY yarn.lock ./
RUN yarn install

# Add modified webconfig file to dependency conflic
COPY ./.saved_src/webpack.config.js ./node_modules/react-scripts/config/webpack.config.js

# add app
COPY . ./
# build prod code
RUN yarn build

# *** The Production Environment ***
FROM nginx:stable-alpine as prod
COPY --from=build /usr/build /usr/share/nginx/html

# Allows for React router to used with nginx
# COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]