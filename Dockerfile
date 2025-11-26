FROM node:22

WORKDIR /usr/src/app

COPY package*.json ./

RUN mkdir -p src/database
COPY src/database/schema.prisma src/database/schema.prisma

RUN npm install --force

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
