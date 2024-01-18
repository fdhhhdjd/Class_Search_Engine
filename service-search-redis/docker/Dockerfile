# Stage 1: Builder
FROM node:18-alpine as builder


# Create folder if it not exits
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json ./
RUN yarn install --no-optional && \
    yarn cache clean

COPY . .

USER root

# Define available eviroment with port
ARG PORT
ENV PORT $PORT

# Stage 2: Final
FROM node:18-alpine as final

# Set the working directory to /usr/src/app
WORKDIR /usr/src/app

# Copy các tệp từ stage builder
COPY --from=builder /usr/src/app .

# Setting user not must is root
USER node

# Expose port
EXPOSE $PORT

# Check heal of applycation 
HEALTHCHECK --interval=60s --timeout=2s --retries=3 CMD sh -c "wget localhost:${PORT}/api/v1 -q -O - > /dev/null 2>&1"

# Command run applycation
CMD ["yarn", "dev"]
