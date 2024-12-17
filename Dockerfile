# FROM node:16 AS build
# WORKDIR /app
# COPY . .
# RUN npm install
# RUN npm run build

# FROM nginx:alpine
# COPY --from=build /app/build /usr/share/nginx/html
# EXPOSE 3000
# CMD ["nginx", "-g", "daemon off;"]


# Используем официальный образ Node.js
FROM node:20-alpine AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта
COPY . .

# Собираем проект
RUN npm run build

# Переходим к серверу для статических файлов
FROM nginx:stable-alpine

# Копируем сборку React из предыдущего шага в директорию nginx
COPY --from=build /app/build /usr/share/nginx/html

# Порт, на котором будет работать приложение
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]