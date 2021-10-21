FROM node:12.22-alpine
WORKDIR /usr/app/front
# COPY ./ ./
COPY package*.json ./
RUN npm install
COPY . .

# порт
# EXPOSE 3000

# команды перед запуском
# CMD ["npm", "start"]