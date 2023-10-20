# Xepelin - Backend

### Stack Tecnologico y Arquitectura

# Domain-Driven Design (DDD)

**Domain-Driven Design (DDD)** es una metodología de diseño de software que se centra en construir sistemas basados en el modelo del dominio, que es una representación conceptual de la realidad que está tratando de modelar y resolver el software. Está orientado especialmente hacia sistemas complejos donde es crucial una buena comprensión y modelado del dominio.

## Integración de DDD, Principios SOLID y Patrón SAGA

El **Dominio Dirigido por el Diseño** (DDD), los principios **SOLID** y el patrón **SAGA** son conceptos que se complementan de manera efectiva al construir sistemas software complejos. A continuación, se detalla cómo se complementan entre sí:

### DDD (Domain-Driven Design)

El DDD es una metodología centrada en el dominio y la lógica del negocio. Se enfoca en crear un modelo del dominio que refleje las realidades del negocio. 
De esta forma podemos desacoplar las entidades ACCOUNTS Y TRANSACTIONS, en diferentes microservices siguiendo los conceptos DDD, SOLID y SAGA

#### Complemento con SOLID:
- Asegura que las clases y objetos del dominio sean cohesivos, extensibles y mantenibles.
- **SRP (Single Responsibility Principle)**: Cada entidad o agregado tiene una sola responsabilidad.
- **OCP (Open/Closed Principle)**: Permite que el dominio evolucione sin romper funcionalidades existentes.

#### Complemento con SAGA:
- En sistemas con microservicios, el patrón SAGA garantiza la consistencia entre servicios sin transacciones distribuidas.

### SOLID

SOLID es un conjunto de principios de diseño que busca hacer el software más comprensible, flexible y mantenible.

#### Complemento con DDD:
- Garantiza que el diseño centrado en DDD sea también robusto y adaptable.

#### Complemento con SAGA:
- **DIP (Dependency Inversion Principle)**: Facilita la orquestación en el patrón SAGA al depender de abstracciones y no de implementaciones concretas.

### SAGA

SAGA es un patrón que garantiza la consistencia en sistemas distribuidos al dividir transacciones largas en series de transacciones más pequeñas.

#### Complemento con DDD:
- Es más fácil identificar transacciones que pueden ser descompuestas usando SAGA al modelar con DDD.

#### Complemento con SOLID:
- Garantiza que cada transacción sea mantenible, reutilizable y fácil de entender.

### Conclusión

La combinación de DDD, SOLID y SAGA nos permite construir software que refleja las necesidades del negocio, es robusto, flexible y mantiene la consistencia en entornos distribuidos. Estos conceptos trabajan en armonía para producir software de alta calidad que se adapta y evoluciona según las necesidades del negocio.


## Beneficios de usar DDD:

1. **Comunicación Eficaz**: Al centrarse en el dominio, se promueve un lenguaje común (a menudo denominado "lenguaje ubícuo") entre los desarrolladores y las partes interesadas no técnicas. Esto facilita la comunicación y asegura que todos entiendan el sistema de la misma manera.
2. **Modelado Flexible**: Ayuda a diseñar sistemas que reflejen la realidad de la lógica de negocio, lo que facilita la adaptación y evolución del software a medida que cambian las necesidades del negocio.
3. **Código Organizado**: DDD promueve la separación de las preocupaciones. Esto ayuda a mantener el código relacionado con el dominio (la lógica del negocio) separado de la infraestructura, la UI, y otros aspectos técnicos.
4. **Calidad y Mantenibilidad**: Al promover prácticas y patrones de diseño, DDD puede llevar a un software de mayor calidad que es más fácil de mantener y evolucionar.
5. **Reducir la Ambigüedad**: Los conceptos y términos del dominio se definen con precisión, lo que reduce las malinterpretaciones y errores en la implementación.

## Conceptos Clave de DDD:

1. **Entidades**: Son objetos que tienen una identidad que se mantiene constante a lo largo del tiempo (por ejemplo, un usuario con una ID única).
2. **Objetos de Valor**: Son objetos inmutables que no tienen una identidad definida y se distinguen sólo por sus atributos (por ejemplo, una dirección).
3. **Agregados**: Son grupos de entidades y objetos de valor que se tratan como una única unidad.
4. **Raíz de Agregado**: Es la entidad principal de un agregado, que garantiza la consistencia de los cambios en todas las entidades y objetos de valor del agregado.
5. **Servicios de Dominio**: Contienen lógica de negocio que no pertenece naturalmente a una entidad o valor objeto.
6. **Repositorios**: Proporcionan una forma de obtener entidades y raíces de agregados del almacenamiento persistente y guardarlas de nuevo.
7. **Lenguaje Ubícuo**: Es un lenguaje común entre desarrolladores y partes interesadas para describir el sistema.
8. **Contexto Acotado**: Define los límites dentro de los cuales un modelo de dominio particular es definido y aplicable.

Al usar DDD, se hace énfasis en la importancia de comprender profundamente el dominio del problema y en utilizar esa comprensión para informar el diseño del software. Es especialmente valioso en dominios complejos donde la lógica y las reglas del negocio son esenciales para el éxito del proyecto.

# CQRS (Command Query Responsibility Segregation)

**CQRS** es un patrón de diseño de software en el que la modificación de datos (comandos) y la consulta de datos (consultas) se separan en dos objetos diferentes, en lugar de ser combinados en un objeto único, como es típico en un CRUD tradicional. 

## Beneficios de usar CQRS:

1. **Escalabilidad**: Al separar las responsabilidades de lectura y escritura, puedes escalar independientemente las operaciones de lectura y escritura según las necesidades.
  
2. **Flexibilidad**: Facilita la implementación de diferentes modelos para lectura y escritura, permitiendo optimizar cada uno para su propósito.

3. **Seguridad Mejorada**: Al separar las operaciones de lectura y escritura, es más fácil aplicar políticas de seguridad y control de acceso específicas para cada operación.

4. **Mejora de Rendimiento**: Permite optimizar el rendimiento de lectura y escritura por separado. Por ejemplo, puedes denormalizar el modelo de lectura para acelerar las consultas.

5. **Simplificación de Código**: Cada modelo puede ser simplificado y adaptado para sus operaciones específicas, lo que puede llevar a una lógica de negocio más simple y clara.

6. **Integración con Event Sourcing**: CQRS se complementa naturalmente con el almacenamiento basado en eventos, donde los cambios se registran como una serie de eventos en lugar de estados.

## Conceptos Clave de CQRS:

1. **Comandos**: Son las operaciones que resultan en un cambio o efecto secundario en el sistema. Por ejemplo, "CrearUsuario" o "ModificarProducto".

2. **Consultas**: Operaciones que devuelven datos sin causar efectos secundarios. Por ejemplo, "ObtenerDetallesDelUsuario" o "ListarProductos".

3. **Modelo de Comando**: Es el modelo diseñado para manejar y validar comandos. Está optimizado para operaciones de escritura.

4. **Modelo de Consulta**: Es el modelo diseñado específicamente para responder consultas. A menudo está denormalizado para rendimiento de consulta óptimo.

5. **Event Sourcing**: A menudo utilizado junto con CQRS, es un patrón donde el estado de la aplicación se deriva de una secuencia de eventos, en lugar de mantener el estado en sí.

6. **Proyecciones**: En sistemas que usan CQRS junto con Event Sourcing, las proyecciones son responsables de consumir eventos y actualizar el modelo de consulta.

7. **Consistencia Eventual**: Dado que las operaciones de lectura y escritura pueden ser desacopladas, el sistema puede no ser inmediatamente consistente. Sin embargo, con el tiempo (y después de la aplicación de todos los eventos), el sistema alcanzará un estado consistente.

En resumen, CQRS es un patrón poderoso que, cuando se aplica en el contexto adecuado, puede ofrecer mejoras significativas en términos de escalabilidad, rendimiento y organización del código. Sin embargo, también introduce complejidad y no es adecuado para todos los sistemas. Es esencial comprender sus ventajas y desafíos antes de decidir aplicarlo.

## NestJS

**NestJS** es un framework para construir aplicaciones de servidor eficientes, escalables y mantenibles en Node.js. Utiliza TypeScript por defecto y combina elementos de programación orientada a objetos (OOP), programación funcional (FP) y programación reactiva (FRP).

### Beneficios de usar NestJS

1. **Arquitectura Modular**: NestJS utiliza módulos para organizar el código, lo que facilita la reutilización y el mantenimiento del código.

2. **Inyección de Dependencias**: Aporta un sistema de inyección de dependencias directamente integrado, lo que facilita la creación de aplicaciones decoupled y escalables.

3. **Flexibilidad**: Aunque NestJS proporciona una estructura robusta, también ofrece flexibilidad para utilizar cualquier otra biblioteca debido a su diseño modular.

4. **Decoradores**: Al utilizar TypeScript, NestJS aprovecha los decoradores para facilitar la definición de rutas, servicios, módulos, entre otros.

5. **Desarrollo Rápido**: Con su conjunto de utilidades y herramientas integradas, NestJS acelera el proceso de desarrollo.

6. **Integración con Frontend**: Es fácil integrar con frameworks frontend como Angular, React o Vue.

### Conceptos clave en NestJS

- **Módulos**: Organizan la aplicación en bloques de funcionalidad y pueden importar otros módulos o ser importados.

- **Proveedores**: Son conceptos fundamentales en NestJS que pueden ser inyectados en los consumidores, como los controladores o servicios.

- **Controladores**: Son responsables de manejar las peticiones HTTP entrantes y devolver respuestas al cliente.

- **Middlewares**: Son funciones que se ejecutan antes de llegar al controlador o al manejador de rutas.

- **Guardianes**: Son responsables de determinar si una petición debería ser manejada por el controlador.

- **Interceptores**: Proporcionan una forma de interceptar y/o transformar las respuestas de las rutas.

- **Filtros de excepciones**: Son responsables de manejar las excepciones lanzadas durante la ejecución.

Es importante notar que, al usar NestJS, se recomienda tener un conocimiento básico de TypeScript y de programación orientada a objetos (OOP) para aprovechar al máximo sus características.

# Prisma ORM

**Prisma ORM** (Object-Relational Mapping) es una herramienta moderna para bases de datos que facilita a los desarrolladores el acceso a sus bases de datos de manera fácil y segura. Se ha popularizado en la comunidad de Node.js y TypeScript debido a sus características y facilidad de uso.

## Beneficios de usar Prisma ORM

1. **Tipo Seguro**: Integración con TypeScript que genera un cliente de base de datos tipo seguro, previniendo errores en tiempo de ejecución y mejorando la experiencia de desarrollo.

2. **Migraciones Sencillas**: Con Prisma Migrate se pueden gestionar y realizar cambios en la estructura de la base de datos de forma sencilla y controlada.

3. **Rendimiento Optimizado**: Genera consultas eficientes a la base de datos, evitando problemas como el N+1.

4. **Fácil de Empezar**: Con una configuración mínima, puedes empezar a trabajar con tu base de datos rápidamente.

5. **Introspección de Bases de Datos**: Capacidad de generar modelos a partir de una base de datos existente.

6. **Soporte para Varios Motores de BD**: Compatible con bases de datos como PostgreSQL, MySQL, SQLite, entre otras.

## Conceptos clave en Prisma

- **Prisma Client**: Cliente de base de datos auto-generado que ofrece acceso tipo seguro a la base de datos.

- **Prisma Migrate**: Herramienta para crear y gestionar migraciones de bases de datos.

- **Prisma Studio**: Herramienta visual para gestionar datos. Es una interfaz gráfica moderna para tus datos.

- **Modelo**: En el esquema de Prisma, defines modelos que representan tablas en la base de datos.

- **Introspección**: Proceso de obtener el esquema de una base de datos existente y reflejarlo en el esquema de Prisma.

- **Esquema Prisma**: Archivo de configuración donde defines tus modelos de datos y configuraciones para Prisma Client, Migrate y otros plugins.

**Conclusión**: **Prisma ORM** acelera el desarrollo con bases de datos ofreciendo herramientas potentes y una experiencia de desarrollo optimizada. Es especialmente útil para quienes trabajan con TypeScript, pero también brinda ventajas para usuarios de JavaScript y otros lenguajes de programación.

## AWS SDK y Amazon Cognito en Node.js

**AWS SDK** y **Amazon Cognito** en Node.js ofrecen una combinación potente para el desarrollo de aplicaciones en el ecosistema AWS. A continuación, se describen los beneficios y conceptos clave:

### Beneficios de usar AWS SDK en Node.js

1. **Integración Directa con AWS**: AWS SDK proporciona acceso programático a casi todos los servicios ofrecidos por AWS, lo que permite una integración fluida y eficiente.
2. **Optimizado para Node.js**: El SDK está diseñado específicamente para trabajar con Node.js, lo que garantiza que se aprovechen todas las características asincrónicas y de rendimiento del entorno.
3. **Gestión Simplificada de Credenciales**: AWS SDK maneja automáticamente la rotación y gestión de credenciales, lo que garantiza transacciones seguras.
4. **Rendimiento y Escalabilidad**: Las aplicaciones desarrolladas con AWS SDK se benefician de la escalabilidad y el rendimiento de AWS.
5. **Desarrollo Rápido**: Con funciones y métodos predefinidos, el SDK acelera el desarrollo, evitando que los desarrolladores escriban código desde cero.

### Beneficios de usar Amazon Cognito en Node.js

1. **Autenticación Sin Servidor**: Cognito gestiona todo el proceso de registro, inicio de sesión y gestión de acceso sin necesidad de infraestructura adicional.
2. **Federación de Identidades**: Permite a los usuarios iniciar sesión a través de proveedores externos como Google, Facebook, y proveedores de identidad SAML.
3. **Seguridad Mejorada**: Cognito ofrece características avanzadas de seguridad como la detección de compromisos, MFA (autenticación multifactor) y el cifrado de datos.
4. **Adaptabilidad**: Con SDKs y bibliotecas adaptadas para Node.js, integrar Cognito en aplicaciones Node.js es directo y sencillo.

### Conceptos clave

- **AWS SDK**: Conjunto de herramientas que permite a los desarrolladores interactuar con servicios de AWS directamente desde su código.
- **Amazon Cognito User Pools**: Directorios que proporcionan registros de usuario y capacidades de inicio de sesión.
- **Amazon Cognito Federated Identities**: Permite crear identidades únicas para sus usuarios y autenticarlas con proveedores de identidad.
- **JWT (JSON Web Tokens)**: Cognito utiliza JWT para tokens de autenticación y actualización.
- **MFA (Multi-Factor Authentication)**: Mecanismo de seguridad adicional que Cognito soporta para confirmar la identidad del usuario.
- **SDK (Software Development Kit)**: Conjunto de herramientas de software que permite a los desarrolladores crear aplicaciones.

### Conclusión
La combinación de **AWS SDK** y **Amazon Cognito** en Node.js ofrece una solución robusta y escalable para el desarrollo de aplicaciones en la nube, proporcionando autenticación segura y fácil acceso a recursos de AWS. Es especialmente beneficiosa para desarrolladores que buscan reducir el tiempo de desarrollo y garantizar la seguridad en sus aplicaciones.


### Objetivo

Desarrollar con buenas practicas de arquitectura de software los siguientes endpoints:
1. POST /accounts: Crea una nueva cuenta bancaria. Este endpoint debería aceptar detalles de la cuenta como el nombre y el número de cuenta, y devolver un ID de cuenta.
2. GET /accounts/<id>/balance: Obtiene el balance de la cuenta bancaria.
3. POST /transactions: Realiza una transacción bancaria. Este endpoint debería
aceptar detalles de la transacción como el ID de la cuenta, el tipo de transacción (depósito o retiro) y el monto de la transacción.
Además, implementa un middleware que registre en la consola cada vez que se realiza un depósito de más de 10,000 US$.

### Suposiciones & Consideraciones

- EL desafío no hablaba de autentificación, pero di por sentado que era mandatorio contar con ello para resguardar todos los recursos, decidi implementar cognito como servicio de autentificación dado que a nivel frontend puedo utilizar amplify para manejar no solo la autentificación sino los recursos de manera eficiente y simple.

- Para la implementación del **event storage** utilice una tabla dentro de la misma base de datos a fines prácticos, Sin embargo, la arquitectura está diseñada para permitir una implementación independiente utilizando una base de datos NoSQL como DynamoDB, por ejemplo.

- En cuanto al objetivo del ejercicio, no se especificaba si un usuario podía tener una o varias cuentas. Tomando como referencia el enfoque de Stripe, se decidió avanzar hacia la posibilidad de que un usuario pueda tener múltiples cuentas (N cuentas, para ser precisos).


### API Documentation

Documentación de Swagger disponible en http://localhost:3000/api/docs


### Puesta en marcha

1 - Clone este resositorio e instale todas las dependencias del proyecto.

```bash
$ npm install
```
2. Copie .env.example to .env y releene los valores.
3. Run `$npm run start` para iniciar el servidor en modo de desarrollo.
4. Cree las tablas necesarias `$npx prisma migrate dev --name init`
5. Watch mode `$npm run start:dev`


### Testing 
1. Run the project unit test `$npm run test`.
2. Run the project e2e test `$npm run test:e2e`.

##### Consideraciones del testing
- Use supertest para probar los endpoints de las APIs.
- Use mysql con prisma como orm para testear a nivel e2e.

### Arquitectura en AWS

Si necesitamos escalar propondría la siguiente arquitectura con una API Getway para la caché y un orquestador para gestionar los contenedores. A su vez un Event Bus como EventBridge para manejar eventos.

