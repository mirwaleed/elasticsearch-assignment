FROM node:16.19.1-alpine3.16

# Install dependencies
RUN apk add --no-cache \
    bash \
    curl \
    git \
    openssh-client \
    rsync \
    tar \
    unzip \
    zip

WORKDIR /app
COPY . /app

RUN npm install -g prisma
RUN npm install

# Expose port 3000
EXPOSE 3000

# Start the server
CMD ["npm", "run", "dev"]
