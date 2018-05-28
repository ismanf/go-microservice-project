FROM mysql:5.7.22
LABEL Name="db_usersvc" Version=0.0.1
ADD create.sql /docker-entrypoint-initdb.d
EXPOSE 3306