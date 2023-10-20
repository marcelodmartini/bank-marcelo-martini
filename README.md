## Xepelin - Build and Execute App 

### Backend and Frontend

- [Backend](https://github.com/marcelodmartini/xepelin-marcelo-martini/tree/main/backend "Backend")
- [Frontend](https://github.com/marcelodmartini/xepelin-marcelo-martini/tree/main/frontend "Frontend")

### Crear usuario
1 - Se debe crear el usuario y verificar en la casilla de mail el codigo de verificacion para la creacion del usuario

### Login
1 - Se loguea y se pedira un codigo a partir de TOTP significa "Time-based One-Time Password" (Contraseña Única Basada en Tiempo). Es un algoritmo que genera un código de autenticación de un solo uso basado en la hora actual y una clave secreta compartida, que generalmente es válida por un breve período de tiempo, como 30 o 60 segundos. Es ampliamente utilizado en la autenticación de dos factores (2FA).
2 - Escaneo/Ingreso en la Aplicación de Autenticación: Utilizarás una aplicación de autenticación, como Google Authenticator o Authy, para escanear el código QR o ingresar la clave secreta. Una vez que lo hagas, la aplicación comenzará a generar códigos TOTP basados en esa clave secreta y la hora actual.


### Start App

1 - Primero hay que correr el siguiente comando.

```bash
$ docker-compose up --build -V
```
2 - Para conectarnos a MySql

```bash
$ docker-compose exec db /bin/bash
$ mysql -h localhost -u user -puser
```
3 - Cree las tablas necesarias se debe ejecutar el siguiente comando
```bash
$docker-compose exec api npx prisma db push
```
Nos conectamos al contenedor con la instrucción siguiente y podemos ejecutar cualquier comando como los tests en la seccion siguiente de Testing:

```bash
$docker-compose exec api 
```

### Testing 
1. Run the project unit test `docker-compose exec api run test`
2. Run the project e2e test `$docker-compose exec apin run test:e2e`
