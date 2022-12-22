# Using node:16-alpine base image
FROM node:18-alpine

# We need the component-lib copied locally resolve the dependency
#COPY ../component-lib .

# Set /app as the default work directory
WORKDIR /app

# copy package.json to the working directory for packages installation
COPY package.json tsconfig.base.json tsconfig.json yarn.lock /app/

# Install npm dependencies
RUN yarn install --pure-lockfile --non-interactive

# Copy all the project files to the working directory
COPY . .

# Expose the port of your application to bind with the host port
EXPOSE 3000

# run your app
CMD ["yarn", "dev"]
