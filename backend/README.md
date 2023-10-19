# xepelin-marcelo-martini
xepelin-marcelo-martini

### Requisitos Generales

1. Debes asegurarte de que el código sea de alta calidad, fácil de mantener y cumpla con los principios de diseño y buenas prácticas
2. El Sistema completo debe poder levantarse en local mediante el uso de docker-compose.

Por favor, ten en cuenta que el código que entregues puede estar incompleto en cuanto a
funcionalidad, pero siempre debe ser capaz de compilar y ejecutar las pruebas.

### Instrucciones de Entrega

Una vez que hayas completado la prueba, por favor sigue estas instrucciones para entregarla:

1. Crea un nuevo repositorio en GitHub para tu proyecto.
2. Asegúrate de que el repositorio es privado
3. Sube tu código al repositorio.
4. Agrega al usuario rodrhern , ldiegoxepelin HaroldGarzon y marnutux como colaborador del repositorio para que pueda revisar tu código.

Por favor, envía el enlace del repositorio en tu respuesta a esta prueba.

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
