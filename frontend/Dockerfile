FROM node:24-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

# Levantar Vite exponiendo el host para Docker
CMD ["npm", "run", "dev", "--", "--host"]