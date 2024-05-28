FROM node:22

WORKDIR /app
ENV PORT 8080

COPY . .
COPY .env .env
RUN npm install

EXPOSE 8080
CMD ["npm", "run", "start"]