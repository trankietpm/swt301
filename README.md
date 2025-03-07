# SWT301 - Lab 2: Unit Testing with React and StringBoot

## 📌 Introduction
This project is a React-based application that demonstrates **unit testing using Jest and React Testing Library**. The goal is to ensure that the core components work as expected using **best practices in unit testing**.
This is a **Backend API** project using **Spring Boot 3.5** and **Maven**. The goal is to build a **simple CRUD** system with **Spring Boot**, using **MySQL** as the database.

---

## 🛠 Project Setup and Installation

### **1️⃣ Prerequisites**
Ensure you have the following installed:
- **Node.js (v16+)**: [Download here](https://nodejs.org/)
- **npm (Node Package Manager)**: Comes with Node.js
- **VS Code or any IDE** for coding

### **2️⃣ Clone the Repository**
Front-end
- To create a new React project, open a terminal and run: npx create-react-app front-end
- Download the jest library using the command **npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event**
- How to run source:
- Run the following command to install the required dependencies: npm install
- Run Project: **npm run start**
- How to run test **npm test**


Backend 
### **1️⃣ System Requirements**
Before you start, you need to install:
- **Java 17+** (Spring Boot 3.5 requires JDK 17 or higher) - [Download here](https://adoptium.net/)
- **Maven** (Selected when creating the project) - [Download here](https://maven.apache.org/)
- **MySQL [Download here](https://cdn.mysql.com//Downloads/MySQLInstaller/mysql-installer-web-community-8.0.40.0.msi)
- **Postman or Curl** for API testing

### **2️⃣ Create a Spring Boot project from start.spring.io**
1. Go to **[Spring Initializr](https://start.spring.io/)**
2. Select the configuration:
- **Project**: Maven
- **Language**: Java
- **Spring Boot version**: 3.5.x
- **Dependencies**: Spring Web, Spring Data JPA, MySQL Driver 
3. Click **Generate** to download the sample project.

4. Unzip and open the folder with **VS Code**.
### **3️⃣ Configure MySQL in `application.properties`** Run Project
Open the file `src/main/resources/application.properties` and update the database connection information:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/database_name
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect


5. Run Projet:mvn spring-boot:run
6. Run Test: mvn test





