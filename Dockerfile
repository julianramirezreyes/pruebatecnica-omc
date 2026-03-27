FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY prisma ./prisma/
COPY dist ./dist/
COPY .env.example ./

RUN npx prisma generate

EXPOSE 3000

CMD ["node", "dist/main"]
