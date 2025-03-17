FROM node:20

WORKDIR /app
COPY package*.json ./
RUN npm install

# Завантажуємо wait-for-it.sh
RUN curl -o /usr/local/bin/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh \
    && chmod +x /usr/local/bin/wait-for-it.sh

COPY . .
EXPOSE 3000

# Змінюємо власника на node
RUN chown -R node:node /app

USER node
CMD ["/usr/local/bin/wait-for-it.sh", "postgres:5432", "--", "npm", "run", "start:dev"]