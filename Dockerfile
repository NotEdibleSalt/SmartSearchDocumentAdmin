FROM node:18.16.1 as builder
WORKDIR /web
COPY . .
RUN npm install --registry=https://registry.npm.taobao.org --no-package-lock --no-save
RUN npm run build

FROM nginx:alpine
RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone
WORKDIR /web
COPY  --from=builder /web/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY  --from=builder /web/dist /web
EXPOSE 80
