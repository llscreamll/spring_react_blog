# устанавливаем самую лёгкую версию JVM
FROM openjdk:8-jdk-alpine
## указываем точку монтирования для внешних данных внутри контейнера
# WORKDIR /usr/app/backend

# внешний порт, по которому наше приложение будет доступно извне
EXPOSE 8099

## указываем, где в нашем приложении лежит джарник
ARG JAR_FILE=server-0.0.1-SNAPSHOT.jar

# добавляем джарник в образ под именем backend.jar
COPY ${JAR_FILE} backend.jar

# команда запуска джарника
ENTRYPOINT ["java","-jar","/backend.jar"]