This is the application documentation. For the IaC processes to occur, it is necessary to have the installation of [Docker]t(https://docs.docker.com/docker-for-windows/install/)

Gabriel Braga Costa
[LinkedIn](https://learn.hashicorp.com/terraform/getting-started/install.html) | [E-mail](mailto:gabriel.bragavera@gmail.com)

## 1. Moving up the infrastructure with Docker-compose
Through Docker-compose, we will move up the entire infrastructure of our application. This basically consists of a `Postgres Database`, `NodeJs / Typescript` App and optionally `PgAdmin4`.
 
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
 
 NOTE: In our application, we are using the database in which it was made available by the docker, therefore, it is not indicated that there is a change in the `host` field (hidden from the example below).

 ```JSON
 # config/config.json
 
 {
  "development": {
    "username": "USERNAME used at Docker-compose",
    "password": "SENHA used at Docker-compose",
    "database": "DATABASE used at Docker-compose", 
  }
  
  # Don't change default host name (db)
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

