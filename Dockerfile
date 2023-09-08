# FROM node:alpine
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# EXPOSE 5000
# CMD ["node", "app.js"]

FROM node:alpine
COPY . /app
WORKDIR /app
CMD node app.js