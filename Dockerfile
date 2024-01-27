FROM node:20.11.0-alpine3.19
RUN addgroup appgroup && adduser -S -G appgroup appuser
USER appuser
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
ENV PORT=3000
EXPOSE 3000
CMD ["node", "index.js"]
