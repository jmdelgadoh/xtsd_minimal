FROM node:18

# Set the working directory
WORKDIR /app

# Install Yarn
# RUN npm install -g yarn

# Install app dependencies
COPY package.json yarn.lock ./
RUN yarn

# Bundle app source code
COPY . .

# Expose the port on which the app will run
EXPOSE 5000

# Start the app
CMD ["yarn", "dev"]