FROM node:24-slim

# Instalar OpenSSL y librerías necesarias para Prisma
RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Generar el cliente de Prisma con los binarios de Linux
RUN npx prisma generate

EXPOSE 3000

# Script de arranque: esperar a que la base de datos esté lista, crear las tablas, sembrar datos y luego iniciar la aplicación
CMD sh -c "sleep 15 && npx prisma db push && sleep 2 && npm run seed && npm run dev"