FROM node:22

WORKDIR /app
ENV PORT 8080

COPY . .
RUN npm install --production

EXPOSE 8080
CMD ["npm", "run", "start"]