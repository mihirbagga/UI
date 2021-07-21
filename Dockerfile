FROM node:10
ENV APP_FILE package.json
ENV APP_HOME /usr/apps
WORKDIR $APP_HOME
ADD $APP_FILE $APP_HOME/$APP_FILE
COPY . .
EXPOSE 8791
ENTRYPOINT ["sh", "-c"]
RUN rm -rf node_modules
RUN npm install --silent
RUN npm rebuild node-sass
CMD ["npm start"]