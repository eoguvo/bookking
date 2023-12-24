FROM node:20-alpine3.19

WORKDIR /app

COPY package*.json .

COPY prisma ./prisma/

RUN npm i

COPY generate_keys.sh /scripts/

RUN sh /scripts/generate_keys.sh

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev:migrate"]