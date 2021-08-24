FROM postgres:latest
WORKDIR /db
COPY *.sql /docker-entrypoint-initdb.d/

ENV POSTGRES_DB=ecommerce
ENV POSTGRES_USER=root
ENV POSTGRES_PASSWORD=rootpass
