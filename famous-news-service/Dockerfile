# Long term support version
FROM node:carbon

LABEL Name="famous_news_service" Version=0.1.0

# Create directory inside image to hold our app
WORKDIR /usr/src/app

# Copy source files to destination
COPY . .

EXPOSE 3001

CMD ["npm", "start"]


