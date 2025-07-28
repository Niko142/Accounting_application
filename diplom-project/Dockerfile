FROM node:20.11-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Статический сервер
FROM nginx:alpine

# Копирование build-a React-app
COPY --from=build /app/build /usr/share/nginx/html

# 👇 Копирование собственного конфига
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]