# *** The Build Environment ***
# pull official base image
FROM node:alpine as build

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm ci
RUN npm install react-scripts@4.0.3 -g 

# add app
COPY . ./
# build prod code
RUN npm run build

# *** The Production Environment ***
FROM nginx:stable-alpine as prod
COPY --from=build /app/build /usr/share/nginx/html

# Allows for React router to used with nginx
# COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]