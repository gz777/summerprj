# Production Dockerfile

# Sets node version
FROM node:8.15.1

# Set working directory
WORKDIR /knoogle-client

# Add `/knoogle-client/node_modules/.bin` to $PATH
ENV PATH /knoogle-client/node_modules/.bin:$PATH

# Install and cache app dependencies
COPY package.json /knoogle-client/package.json
RUN npm install
RUN npm install react-scripts@3.0.1 -g --silent

# Create a production build
COPY . /knoogle-client
RUN npm run build

# Production environment
FROM nginx:1.16.0
COPY --from=build /knoogle-client/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
