FROM alpine:latest

# Install necessary packeges
RUN apk --no-cache add nodejs npm nginx python3 task build-base

COPY . /src/taskguardian
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/server.conf /etc/nginx/conf.d/default.conf
COPY ./run.sh /run.sh

# Setting environment variables
ENV TASKRC_PATH='/.taskrc'
ENV TASKDIR_PATH='/.task'

# Build node application
RUN cd /src/taskguardian && npm install \
    && npm run build

# Expose port 80
EXPOSE 80
VOLUME ["/.task", "./taskrc"]

CMD ["/run.sh"]