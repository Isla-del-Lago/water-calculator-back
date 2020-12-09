FROM node:lts

WORKDIR /home/app

COPY package.json .
COPY tsconfig.json .
COPY /src ./src

RUN npm install

RUN ls -la

EXPOSE 3000

CMD ["npm", "run", "start"]
