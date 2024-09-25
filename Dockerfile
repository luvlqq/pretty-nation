FROM node:18-alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем весь исходный код
COPY . .

# Сборка проекта
RUN npm run build
RUN npx prisma generate

# Создаем stage для production
FROM node:18-alpine AS production

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы для установки production
COPY package*.json ./

# Устанавливаем ТОЛЬКО production зависимости
RUN npm install --only=production --legacy-peer-deps

# Копируем собранный код из предыдущей стадии
COPY --from=builder /app/dist ./dist

# Копируем файл env
COPY .env ./

# Указываем порт
EXPOSE 3000

# Запуск приложения
CMD ["npm", "run", "start:prod"]
