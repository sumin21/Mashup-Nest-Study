# Dockerfile
# My first docker project! (NestJS)

# FROM node:12-alpine
# WORKDIR /app
# COPY package*.json /app

# RUN npm install
# RUN rm -Rf node_modules
# RUN rm -f package-lock.json
# RUN npm install
# COPY ./src /app/src

# EXPOSE 3000

# CMD [ "npm", "run", "start:dev" ]

# Step 1
## base image for Step 1: Node 10
FROM node:16-alpine as builder
WORKDIR /app
## 프로젝트의 모든 파일을 WORKDIR(/app)로 복사한다
COPY . .
## Nest.js project를 build 한다
RUN npm install
RUN npm run build


# Step 2
## base image for Step 2: Node 10-alpine(light weight)
FROM node:16-alpine
WORKDIR /app
## Step 1의 builder에서 build된 프로젝트를 가져온다
COPY --from=builder /app ./
## application 실행
CMD ["npm", "run", "start:dev"]