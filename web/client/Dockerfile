FROM node:latest

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# add frontend
COPY . ./

# exposing the frontend port
EXPOSE 3000
RUN npm run build
RUN npm install -g serve


# start frontend
CMD ["serve", "-s", "build", "-l", "3000", "-n"] 