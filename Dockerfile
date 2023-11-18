# FROM nginx:alpine as build 
FROM node:14.17.6-alpine as build 
ENV NODE_ENV=production

WORKDIR /app

COPY . /app/

RUN npm install --silent
RUN npm install react-scripts -g --silent

RUN npm run build

# FROM nginx:alpine
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# RUN rm /etc/nginx/conf.d/default.conf 
# COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]