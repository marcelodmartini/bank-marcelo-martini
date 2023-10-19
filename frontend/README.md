
## Parte 1: Fronted

### Objetivo

Desarrolla una aplicación de interfaz de usuario que permita a los usuarios abrir una nueva
cuenta bancaria y realizar transacciones bancarias como depósitos y retiros.
1. La aplicación debe permitir a los usuarios introducir los detalles de su cuenta, como el nombre, el número de cuenta y el saldo inicial.
2. Los usuarios deben poder realizar depósitos y retiros, introduciendo el monto de la transacción y seleccionando el tipo de transacción.
3. La aplicación debe mostrar el balance actualizado de la cuenta después de cada transacción.
4. La aplicación debe trabajar con CSS in JS y state management.
5. Implementa pruebas unitarias con Jest y asegúrate de que la cobertura de las pruebas sea mayor al 80%.
6. Incluye un archivo README que explique cómo ejecutar el código y las pruebas.

### Supuestos

- Desde el front se puede crear un cuenta sola, pero la api backend soporta crear mas de una cuenta, solo deberíamos extender el feature en el front.

@testing-library/react-hooks
A Note about React 18 Support
As part of the changes for React 18, it has been decided that the renderHook API provided by this library will instead be included as official additions to both react-testing-library (PR) and react-native-testing-library (PR) with the intention being to provide a more cohesive and consistent implementation for our users.

Please be patient as we finalise these changes in the respective testing libraries. In the mean time you can install @testing-library/react@^13.1
- 

# Guía de Beneficios: React, Jest, Next.js y AWS Amplify

## Índice

- [React](#react)
- [Jest](#jest)
- [Next.js](#nextjs)
- [AWS Amplify](#aws-amplify)

---

## React

- **Arquitectura Basada en Componentes**: Construye aplicaciones usando un enfoque basado en componentes, promoviendo reutilización, mejor gestión del estado y una clara separación de responsabilidades.

- **DOM Virtual**: Optimiza el renderizado con un DOM virtual, haciendo actualizaciones de la UI más eficientes.

- **Flexibilidad**: Intégralo con varios backends; no está vinculado a una pila tecnológica específica.

- **Rico Ecosistema**: Soluciones para desafíos comunes de desarrollo web gracias a bibliotecas como Redux y React Router.

- **Soporte Comunitario**: Una gran comunidad que ofrece numerosos recursos, herramientas y contribuciones.

- **Madurez**: Adoptado y mantenido por grandes empresas como Facebook, Instagram y Airbnb.

---

## Jest

- **Rapidez**: Ejecuta pruebas en paralelo para una experiencia más rápida.

- **Pruebas de Instantáneas**: Sigue fácilmente los cambios en la UI.

- **Sistema de Simulacros**: Simula objetos, funciones y módulos aislando el código en prueba.

- **Ejecutor Integrado**: No requiere un ejecutor de pruebas separado.

- **Configuración Mínima**: Viene con utilidades para probar componentes de React.

---

## Next.js

- **Renderizado en el Servidor (SSR)**: Pre-renderiza páginas en el servidor mejorando rendimiento y SEO.

- **Generación de Sitios Estáticos (SSG)**: Construye páginas en el momento de compilación para contenido estático.

- **Rutas API**: Crea puntos finales de API dentro de la aplicación.

- **División Automática de Código**: Carga solo el código necesario.

- **Soporte para CSS y Sass**: Integración sin configuraciones adicionales.

- **Recarga en Caliente**: Refleja cambios inmediatamente durante el desarrollo.

- **Sistema de Plugins**: Extiende funcionalidades con plugins.

---

# AWS Amplify y Amazon Cognito

AWS Amplify y Amazon Cognito son dos servicios ofrecidos por Amazon Web Services (AWS) que se utilizan ampliamente en el desarrollo de aplicaciones modernas, especialmente en contextos de aplicaciones web y móviles. Veamos qué son y cuáles son sus beneficios:

## AWS Amplify
### ¿Qué es?
AWS Amplify es un conjunto de herramientas y servicios que facilitan el desarrollo de aplicaciones web y móviles completas, con backend en la nube.

### Beneficios de AWS Amplify:
- **Desarrollo Rápido**: Amplify ofrece componentes y bibliotecas frontend preconstruidos que aceleran el desarrollo.
- **Configuración Sencilla**: Amplify proporciona una interfaz de línea de comandos y una consola de administración para configurar y desplegar servicios de AWS con facilidad.
- **Flexibilidad**: Amplify es compatible con las principales plataformas y frameworks frontend como React, React Native, Angular, Vue, entre otros.
- **Escalabilidad**: Las aplicaciones creadas con Amplify se benefician de la escalabilidad de AWS, asegurando que tu aplicación pueda manejar el crecimiento de usuarios sin problemas.
- **Integración con otros servicios de AWS**: Amplify se integra con otros servicios AWS como Lambda, AppSync, S3 y más, para ofrecer capacidades completas en la nube.
- **Hosting y Despliegue CI/CD**: Amplify Console ofrece capacidades de hosting y despliegue continuo para aplicaciones web y móviles.

## Amazon Cognito
### ¿Qué es?
Amazon Cognito es un servicio que facilita la autenticación, autorización y gestión de usuarios para aplicaciones web y móviles.

### Beneficios de Amazon Cognito:
- **Autenticación sin Servidor**: Cognito maneja todo el proceso de registro, inicio de sesión y gestión de accesos sin necesidad de servidores.
- **Federación de Identidades**: Cognito permite a los usuarios iniciar sesión a través de proveedores externos como Google, Facebook, Amazon, así como a través de proveedores de identidad SAML.
- **Seguridad**: Cognito ofrece características avanzadas de seguridad como la detección de compromisos, la verificación en dos pasos y el cifrado de datos.
- **Sincronización de Datos**: Con Cognito, puedes sincronizar datos entre dispositivos, lo que es útil para aplicaciones móviles.
- **Adaptable a Normativas**: Cumple con ciertos estándares y normativas, como GDPR y HIPAA.
- **Escalabilidad**: Al igual que otros servicios de AWS, Cognito es escalable y puede manejar millones de usuarios.

## En resumen:
AWS Amplify te ayuda a construir y desplegar aplicaciones en la nube de manera más rápida y sencilla, proporcionando herramientas y servicios integrados. Amazon Cognito se centra en la autenticación y gestión de usuarios, asegurando que tu aplicación sea segura y que puedas gestionar y autenticar usuarios con facilidad. Juntos, estos servicios facilitan la creación de aplicaciones robustas, seguras y escalables en la plataforma AWS.

## Configuración de AWS Amplify con Amazon Cognito en Next.js

Las siguientes variables de entorno son utilizadas para configurar AWS Amplify y Amazon Cognito:

### 1. `NEXT_PUBLIC_API_URL`
- **Qué es:** URL del punto final de tu API.
- **Valor esperado:** URL completa del endpoint, por ejemplo: https://myapi.example.com


### 2. `NEXT_PUBLIC_AWS_COGNITO_REGION`
- **Qué es:** La región de AWS donde creaste tu User Pool en Amazon Cognito.
- **Valor esperado:** Código de región de AWS como:
- `us-west-1`
- `us-east-1`
- `eu-west-1`
- ...y otros.

### 3. `NEXT_PUBLIC_AWS_USER_POOLS_ID`
- **Qué es:** Identificador único de tu User Pool en Amazon Cognito.
- **Valor esperado:** Cadena alfanumérica, ejemplo: us-west-1_aBcDeFgHi


### 4. `NEXT_PUBLIC_AWS_USER_POOLS_WEB_CLIENT_ID`
- **Qué es:** Identificador del cliente web de tu User Pool en Amazon Cognito.
- **Valor esperado:** Cadena alfanumérica, ejemplo:


### Pasos para obtener estos valores:

1. Accede al AWS Management Console.
2. Navega hasta Amazon Cognito.
3. Selecciona 'User Pools' y elige el User Pool que estás utilizando.
4. En el panel de navegación, selecciona "App clients" para obtener `WEB_CLIENT_ID`.
5. La información como `REGION` y `USER_POOL_ID` está en la vista general del User Pool.

> ⚠️ **Nota de seguridad:** A pesar de que estas variables comienzan con `NEXT_PUBLIC_`, asegúrate de no exponer información sensible. Estas variables se expondrán al lado del cliente, pero siempre verifica que no estés compartiendo secretos o claves importantes.

---

### Start la app Frontend

1 - Clone este resositorio 

```bash
$ npm install
```

2. Copie .env.example to .env y releene los valores.

3. Para iniciar el servidor en modo de desarrollo.

```bash
$ npm run dev
```

4. Abra su navegador en [http://localhost:3000](http://localhost:3000).

### Testing 
1. Correr los tests 
```bash
$ $npm run test
```
