FROM mcr.microsoft.com/playwright:v1.57.0-jammy

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ENV NODE_ENV=production
ENV BASE_URL=https://755742.myshoptet.com

CMD ["npx", "playwright", "test"]
