FROM node:14
RUN git clone https://github.com/missnora07/am1uth-apis /railway/Nora007
WORKDIR /railway/Nora007
COPY package*.json ./
COPY . .
RUN npm install express @bot-wa/bot-wa-baileys
EXPOSE 3000
CMD ["node", "index.js"]
