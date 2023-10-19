# xepelin-marcelo-martini
xepelin-marcelo-martini

### Requisitos

1. Debes asegurarte de que el código sea de alta calidad, fácil de mantener y cumpla con los principios de diseño y buenas prácticas
2. El Sistema completo debe poder levantarse en local mediante el uso de docker-compose.

- [Backend](https://github.com/marcelodmartini/xepelin-marcelo-martini/tree/main/backend "Backend")
- [Frontend](https://github.com/marcelodmartini/xepelin-marcelo-martini/tree/main/frontend "Frontend")

### Testing 
1. Run the project unit test `docker-compose exec api run test`
2. Run the project e2e test `$docker-compose exec apin run test:e2e`

### Start App

1 - Hay que correr el siguiente comando.

```bash
$ docker-compose up --build -V
```
2 - Para conectarnos a MySql

```bash
$ docker-compose exec db /bin/bash
$ mysql -h localhost -u user -puser
```
3 - Cree las tablas a partir de prisma ORM
```bash
$docker-compose exec api npx prisma db push
```
Al conectarnos al contenedor con la instrucción docker-compose exec api y a partir de ahi podemos ejecutar el comando que deseemos.
