FROM node
ADD entrypoint.sh /entrypoint.sh
RUN apt-get update -qq && apt-get install -y && chmod +x /entrypoint.sh;
WORKDIR /app/src
ENTRYPOINT ["/entrypoint.sh"]
#CMD ["/bin/bash"]