FROM node:22-slim
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY src .
CMD ["node", "src/index.js"]