FROM node:latest
WORKDIR /app
COPY . .
RUN npm install react-scripts -g --silent
RUN npm install
RUN npm run build
RUN npm install -g serve
EXPOSE 8080
CMD serve -p 8080 -s build -n