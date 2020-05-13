This is the application documentation. For the IaC processes to occur, it is necessary to have the installation of [Docker](https://docs.docker.com/docker-for-windows/install/)

Gabriel Braga Costa
[LinkedIn](https://learn.hashicorp.com/terraform/getting-started/install.html) | [E-mail](mailto:gabriel.bragavera@gmail.com)

## Moving up the infrastructure with Docker-compose
Through Docker-compose, we will move up the entire infrastructure of our application. This basically consists of a `Postgres Database`, `NodeJs / Typescript app` add optionally `PgAdmin4`.
 
 1) Configure access to the new PostgresSql in the `docker-compose.yaml` file (`project root`)
 ```HCL
 # docker-compose.yaml
 
services:
  db:
    container_name: db_postgres_sql
    image: postgres
    environment:
      # You just need to edit here
      POSTGRES_USER: "| -> Your Postgres USER"
      POSTGRES_PASSWORD: "| -> Your Postgres PASSWORD"
      POSTGRES_DB: "| -> Your Postgres DATABASE NAME"
      
    ...

```
 > The methodology adopted for the storage of keys can be improved. However, for security purposes, it is necessary that `the user who will
 make use of this define the access data of the new database`.
 
 
 2) Configure Sequelize to perform the migrations / seeders (`lib/sequelize/config/config.json`):
 
The migrations and the population of the database with the initial data are done automatically by Docker (when we go up our infrastructure in the next steps), however, it is necessary to configure the connection with the database.
 
 NOTE: In our application, we are using the database in which it was made available by the docker, therefore, `it is not indicated that there is a change in the host field`.(hidden from the example below).

 ```JSON
 # lib/sequelize/config/config.json
 
 {
  "development": {
    "username": "USERNAME used at Docker-compose",
    "password": "SENHA used at Docker-compose",
    "database": "DATABASE used at Docker-compose", 
  }
  
}

```
> If you want to change the host name, you need to change the Postgres SQL service name in the docker-compose

3) Configure PgAdmin4 access `OPTIONAL` (`docker-compose.yaml` at the root)
 ```HCL
 # docker-compose.yaml
 
services:
  pgAdmin4:
    container_name: pgAdmin4
    image: dpage/pgadmin4
    environment:
      # You just need to edit here
      PGADMIN_DEFAULT_EMAIL: "user@example"
      PGADMIN_DEFAULT_PASSWORD: "root"
      
    ...

```
> It is much easier to view the tables / rows than were created in our database through PgAdmin4.

4) Putting everything to work (`run via console at the root of the project`)

 ```console
docker-compose up --build -d
```

When executing this command, the docker will go up our environment and we will be able to access our database as well as our API functions. See below for more information.

## Default User
Temporary user generated from the seed.

| Username | Password | 
| --- | --- |
| user-manager | default | 

> With this user it is possible to generate other users, and later, for security reasons, delete this default user.

# API Documentation
![postman-logo text-320x132](https://user-images.githubusercontent.com/4249709/29496848-63ad446c-85b1-11e7-904e-a4ddad25e9db.png)

In order not to extend this documentation too much and due to the high availability of resources offered by [Postman] (https://www.postman.com), all endpoint specifications / requirements are available in the file `postman-collection.json` at the root of the project.

The application would support new features in a scalable and organized way. It was a very interesting challenge.
