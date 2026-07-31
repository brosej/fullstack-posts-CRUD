### Tecnologías Utilizadas

- **Frontend:** React 18, TypeScript, Redux Toolkit, Tailwind CSS, React Hook Form, Zod, Vite.
- **Backend:** Node.js (v24), Express, Prisma ORM, TypeScript.
- **Base de Datos:** SQL Server 2022 (Dockerizado).
- **DevOps & Tooling:** Docker, Docker Compose.

### Arquitectura y Decisiones de Diseño

- **Separación de Responsabilidades (Backend):** Arquitectura estructurada en capas (Rutas -> Controladores -> Servicios). La lógica de negocio reside exclusivamente en los Servicios, utilizando Prisma ORM para la capa de acceso a datos, logrando un alto nivel de desacoplamiento y testeabilidad.
- **Aislamiento de Lógica de Negocio (Frontend):** Implementación del patrón de *Custom Hooks* para extraer la suscripción al estado global (Redux) y las validaciones. Esto mantiene los componentes de React limpios y netamente presentacionales, respetando el Principio de Responsabilidad Única.
- **Validación "Fail-Fast" (Backend):** Se implementó Zod como middleware en las rutas del backend para interceptar y validar los payloads antes de que alcancen los controladores.
- **Filtrado y Paginación Client-Side:** Se optó por procesamiento en memoria en el Frontend para garantizar una respuesta rápida al usuario, considerando lo liviano de los payloads de texto.

### Instrucciones para Ejecutar el Proyecto

## Prerrequisitos
Docker y Docker Compose instalados.

Node.js v18+ y npm (en caso de usar la Opción 2 de ejecución manual).

## Clonar el repositorio:

git clone https://github.com/brosej/fullstack-posts-CRUD 

cd fullstack-posts-CRUD

## Opcion 1 (recomendada): Levantar el proyecto con docker compose (Frontend, API y SQL Server):

# Ejecutar desde la raiz del proyecto:

docker compose up --build

Frontend: http://localhost:5173

Backend API: http://localhost:3000/api/posts

SQL Server: localhost:1433

(El contenedor del backend ejecutará el esquema de Prisma (El ORM) y poblará la BD 15 posts de prueba automáticamente con el script seeder)


## Opcion 2: Ejecución Manual / Desarrollo Local (Híbrido) y base de datos con docker:

# Ejecutar desde la raiz del proyecto:

docker compose up db -d

cd backend

npm install

npx prisma migrate deploy

npm run seed

npm run dev

(API en http://localhost:3000).

cd frontend

npm install

npm run dev

(Front en http://localhost:5173).
