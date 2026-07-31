# Informe de despliegue en AWS

## 1. Despliegue del Frontend
Propuesta: AWS S3 + AWS CloudFront.

Justificación: Al estar desarrollado en React con Vite, el resultado del build es una SPA con archivos estáticos HTML, JS y CSS. Entonces la solución más optima, económica y escalable en AWS es almacenar estos archivos en un bucket de S3 y distribuirlos mediante la CDN de CloudFront. Si fuese un proyecto que requiriera server-side rendering como una aplicación compleja construida con Next.js se optaría por algo como AWS Amplify o por un servicio en ECS para procesar el renderizado en el servidor pero este no es el caso.  

## 2. Despliegue de la Base de Datos
Propuesta: AWS RDS for SQL Server (Edición Express / Web).

Justificación: Al ser una base de datos relacional (SQL Server 2022), RDS es la opción estándar del ecosistema. Nos quita la carga de administrar un servidor respectivo, y RDS se encarga automáticamente de backups, parches del sistema operativo y mantenimiento. Una instancia pequeña (como db.t3.micro) es más que suficiente para cubrir la demanda manteniendo costos mínimos.

## 3. Políticas y Reglas IAM 
Propuesta: Aplicar del principio de menor privilegio. La regla general es no otorgar a ninguna persona ni servicio más accesos de los estrictamente necesarios para cumplir su función, entonces la estrategia para este proyecto sería:

-Un rol para el Backend que acceso exclusivo para comunicarse con la base de datos dentro de su VPC y red privada. No tiene permisos de administración ni acceso a la consola de AWS.

-Un rol para CI/CD (Despliegues automáticos): Un rol temporal con permisos limitados únicamente a actualizar los archivos en el bucket de S3, invalidar la caché de CloudFront y desplegar la nueva imagen del backend.

-Cero credenciales fijas: evitar el uso de claves de acceso globales (access keys) quemadas en el código, de manera que se manejen mediante roles de ejecución de AWS.

## 4. Otros Servicios Útiles del Ecosistema AWS (Máximo 3)
AWS App Runner (o ECS): Para desplegar el Backend en Node.js de forma rápida usando la imagen Docker que ya construimos, sin la complejidad de configurar servidores EC2 desde cero.

AWS ECR (Elastic Container Registry): Un registro privado de imágenes Docker dentro de AWS donde subir y almacenar las versiones de la imagen de nuestra API backend antes de desplegarlas.

AWS CloudWatch: Un servicio básico para revisar los logs de la API en producción, monitorear si el servidor se queda sin memoria o CPU, y recibir alertas si el backend lanza errores repentinos.