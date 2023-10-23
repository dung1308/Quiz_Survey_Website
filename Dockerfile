FROM node:12.17.0-alpine
WORKDIR /usr
COPY package.json ./
RUN npm install
COPY --from=0 /usr/dist .
RUN npm install pm2 -g
EXPOSE 80
CMD ["pm2-runtime","app.js", "dev"]