## Xepelin - Build and Execute App 

### Backend and Frontend

- [Backend](https://github.com/marcelodmartini/xepelin-marcelo-martini/tree/main/backend "Backend")
- [Frontend](https://github.com/marcelodmartini/xepelin-marcelo-martini/tree/main/frontend "Frontend")

### Crear usuario
1 - Se debe crear el usuario y verificar en la casilla de mail el codigo de verificacion para la creacion del usuario

### Login
1 - Se loguea y se pedira un codigo a partir de TOTP significa "Time-based One-Time Password" (Contraseña Única Basada en Tiempo). Es un algoritmo que genera un código de autenticación de un solo uso basado en la hora actual y una clave secreta compartida, que generalmente es válida por un breve período de tiempo, como 30 o 60 segundos. Es ampliamente utilizado en la autenticación de dos factores (2FA).
2 - Escaneo/Ingreso en la Aplicación de Autenticación: Utilizarás una aplicación de autenticación, como Google Authenticator o Authy, para escanear el código QR o ingresar la clave secreta. Una vez que lo hagas, la aplicación comenzará a generar códigos TOTP basados en esa clave secreta y la hora actual.

### Arquitectura en AWS

![](https://github.com/marcelodmartini/xepelin-marcelo-martini/blob/main/architecture_diagram.png)

El diagrama representa una arquitectura típica de aplicaciones desplegadas en Amazon Web Services (AWS). A continuación, se desglosa cada componente y su función:

## 1. Dispositivos Cliente (Smartphone y Desktop)
   - **Función**: Representan los dispositivos de los usuarios que acceden a la aplicación.
   - **Comunicación**: Hacen peticiones a Amazon Route 53, generalmente para resolver la dirección del servicio al que quieren acceder.

## 2. Amazon Route 53
   - **Función**: Es un servicio de DNS. Traduce nombres de dominio en direcciones IP.
   - **Comunicación**: Dirige el tráfico entrante al Amazon API Gateway.

## 3. Amazon API Gateway
   - **Función**: Es un servicio que facilita la creación, publicación, mantenimiento, monitorización y protección de APIs.
   - **Comunicación**: Interactúa con Amazon Cognito para autenticar a los usuarios mediante JWT (JSON Web Tokens). Posteriormente, el tráfico puede dirigirse a otros servicios, como Amazon ECS.

## 4. Amazon Cognito
   - **Función**: Proporciona autenticación y gestión de identidades.
   - **Comunicación**: Autentica a los usuarios y devuelve tokens JWT al API Gateway.

## 5. AWS SDK JavaScript & AWS Amplify
   - **Función**: Son herramientas que facilitan la conexión y utilización de servicios AWS desde aplicaciones cliente.
   - **Comunicación**: Las aplicaciones cliente las usan para hacer peticiones directamente a los servicios AWS.

## 6. AWS Elastic Cache
   - **Función**: Es un servicio de almacenamiento en caché en memoria.
   - **Comunicación**: Puede ser usado para almacenar datos temporalmente y mejorar la velocidad de respuesta.

## 7. AWS Network Load Balancer
   - **Función**: Distribuye el tráfico entrante entre múltiples instancias de servicio.
   - **Comunicación**: Dirige el tráfico a las instancias apropiadas gestionadas por Amazon ECS.

## 8. Amazon ECS (Elastic Container Service)
   - **Función**: Es un servicio de gestión de contenedores.
   - **Comunicación**: Ejecuta contenedores (por ejemplo, Docker) que contienen la aplicación y se comunican con servicios como Amazon RDS y Amazon SQS.

## 9. EC2 & Docker & Node.js & Services App
   - **Función**: EC2 proporciona capacidad de computación. Docker es una plataforma de contenedores. Node.js es un entorno de ejecución y "Services App" es probablemente la aplicación en sí.
   - **Comunicación**: Las instancias EC2 ejecutan contenedores Docker con aplicaciones Node.js que se conectan a bases de datos (Amazon RDS) y colas de mensajes (Amazon SQS).

## 10. Amazon RDS
   - **Función**: Servicio de base de datos relacional.
   - **Comunicación**: Almacena y recupera datos para la aplicación.

## 11. Amazon SQS
   - **Función**: Es un servicio de colas de mensajes.
   - **Comunicación**: Permite la comunicación entre diferentes partes de la aplicación de manera desacoplada.

## 12. Event Bridge AWS
   - **Función**: Es un bus de eventos que facilita la comunicación entre aplicaciones.
   - **Comunicación**: Transmite eventos a AWS Rules.

## 13. AWS Rules
   - **Función**: Define cómo se entregan y manejan los eventos.
   - **Comunicación**: Dirige eventos a sus destinos respectivos, representados como "TARGET".

### Ejemplo de Comunicación

## 1. Inicio de la Solicitud:
- Un usuario desde su smartphone inicia la aplicación. Al hacerlo, puede que la aplicación necesite cargar recursos estáticos como imágenes o archivos CSS. Esta solicitud es manejada por **Amazon Route 53**, que redirige el tráfico hacia **Amazon S3** donde estos activos están almacenados.

## 2. Solicitud de Funcionalidad Dinámica:
- Suponiendo que el usuario desea realizar una acción que requiere procesamiento en el backend, como ver su perfil o realizar una transacción, la solicitud es enviada y es dirigida por **Route 53** al **Amazon API Gateway**.

## 3. Autenticación de la Solicitud:
- **Amazon API Gateway** no procesa inmediatamente la solicitud. Primero, verifica si la petición tiene un token JWT asociado. Si lo tiene, redirige esa solicitud a **Amazon Cognito** para la autenticación.
- **Amazon Cognito** valida el token JWT, confirmando que el usuario está autenticado y tiene permiso para realizar la acción solicitada.

## 4. Procesamiento de la Solicitud:
- Una vez que se confirma la autenticidad del usuario, **API Gateway** pasa la solicitud al **AWS Network Load Balancer**.
- El Load Balancer distribuye la petición, dirigiéndola al contenedor adecuado dentro del **Amazon ECS** para balancear eficientemente la carga y evitar cuellos de botella.
- Dentro de **Amazon ECS**, el contenedor que recibe la petición puede ser una aplicación (por ejemplo, basada en Node.js) que procesa la solicitud. Esto puede implicar interactuar con bases de datos en **Amazon RDS**, gestionar operaciones asíncronas mediante colas en **Amazon SQS**, o cualquier otro proceso necesario.

## 5. Respuesta al Usuario:
- Una vez que la solicitud ha sido procesada en ECS, se genera una respuesta. Esta respuesta viaja en sentido inverso: del contenedor en ECS al Load Balancer, pasando por el API Gateway.
- Finalmente, el **API Gateway** envía la respuesta al smartphone del usuario.

## 6. Operaciones Asíncronas (si se requieren):
- Si en algún momento durante el procesamiento de la solicitud se desencadena una operación asíncrona, como una notificación o un proceso que debe ejecutarse posteriormente, esta operación se encola en **Amazon SQS**. Posteriormente, otros servicios o contenedores pueden tomar estos mensajes y procesarlos según sea necesario.

Este diseño aprovecha la naturaleza escalable y distribuida de AWS para manejar múltiples usuarios y operaciones de manera eficiente.



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
