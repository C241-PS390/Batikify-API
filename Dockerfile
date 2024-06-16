FROM node:22

WORKDIR /app
ENV PORT 8080

COPY package*.json ./ 
RUN npm install --omit=dev

COPY . .
EXPOSE 8080

CMD ["npm", "run", "start"]