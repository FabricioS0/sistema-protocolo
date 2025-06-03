FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY . /app

RUN ./mvnw clean package -DskipTests

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "target/seu-app.jar"]
