FROM node:20-alpine

RUN npm install -g pnpm

WORKDIR /home/node/otm-web

COPY package.json .

COPY pnpm-lock.yaml .

RUN pnpm install

COPY . .

RUN npx prisma generate

RUN pnpm build

ENV PORT=4000

CMD ["node", "build" ]
