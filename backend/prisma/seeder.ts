import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Ejecutando seeder de la base de datos...');

const initialPosts = [
    {
      nombre: 'Primer post de prueba',
      descripcion: 'Esta es la primera publicación automatizada para probar el challenge. Está funcionando correctamente.',
      resumen: 'Primer post de prueba técnica.'
    },
    {
      nombre: 'La digitalización en la educación',
      descripcion: 'Cada día más instituciones educativas están adoptando herramientas digitales para mejorar la enseñanza y el aprendizaje.',
      resumen: 'Adopción de herramientas digitales en educación.'
    },
    {
      nombre: 'Atención a todos los desarrolladores',
      descripcion: 'Las nuevas tecnologías de desarrollo web están cambiando rápidamente. Mantente actualizado con las últimas tendencias y herramientas.',
      resumen: 'Tendencias y evolución en desarrollo web.'
    },
    {
      nombre: 'Adopción de Arquitectura Limpia',
      descripcion: 'Implementar Clean Architecture en proyectos de backend permite desacoplar la lógica de negocio de los marcos de trabajo y bases de datos.',
      resumen: 'Desacoplamiento y mantenibilidad en backend.'
    },
    {
      nombre: 'Buenas prácticas con TypeScript y React',
      descripcion: 'El uso de interfaces estrictas y tipado en componentes de React reduce los errores en tiempo de ejecución y mejora el DX.',
      resumen: 'Tipado estricto y mejora de DX en React.'
    },
    {
      nombre: 'Gestión de Estado con Redux Toolkit',
      descripcion: 'Redux Toolkit simplifica la configuración del store y reduce la cantidad de código repetitivo al manejar estados globales asíncronos.',
      resumen: 'Simplificación de estado global con RTK.'
    },
    {
      nombre: 'Optimización de Consultas en SQL Server',
      descripcion: 'El uso adecuado de índices y la optimización de sentencias SQL garantizan respuestas rápidas ante grandes volúmenes de datos.',
      resumen: 'Estrategias de indexación y rendimiento SQL.'
    },
    {
      nombre: 'Validación de Datos en el Frontend con Zod',
      descripcion: 'Integrar Zod con React Hook Form permite validar esquemas de datos de forma segura e intuitiva antes de enviarlos a la API.',
      resumen: 'Validación de formularios con Zod y RHF.'
    },
    {
      nombre: 'Estrategias de Despliegue en AWS',
      descripcion: 'Aprovechar servicios como ECS, EC2 y RDS facilita el escalamiento horizontal y la alta disponibilidad de aplicaciones web enterprise.',
      resumen: 'Infraestructura escalable y alta disponibilidad en AWS.'
    },
    {
      nombre: 'Contenedores y Docker Compose en Desarrollo',
      descripcion: 'Dockerizar la base de datos y la API asegura un entorno uniforme de desarrollo para todos los miembros del equipo.',
      resumen: 'Entornos de desarrollo reproducibles con Docker.'
    },
    {
      nombre: 'Importancia de la Integración Continua (CI/CD)',
      descripcion: 'Automatizar las pruebas y el despliegue mediante pipelines reduce drásticamente el riesgo de errores en producción.',
      resumen: 'Automatización de pruebas y despliegues continuos.'
    },
    {
      nombre: 'Uso de ORMs Modernos: Prisma',
      descripcion: 'Prisma ofrece una capa de abstracción de base de datos fuertemente tipada que previene errores tipográficos en las consultas SQL.',
      resumen: 'Acceso a datos fuertemente tipado con Prisma.'
    },
    {
      nombre: 'Diseño Modular de Interfaces con Tailwind CSS',
      descripcion: 'El enfoque utility-first de Tailwind permite construir interfaces personalizadas de forma rápida sin salir del código JSX.',
      resumen: 'Estilizado agilizado y utility-first en React.'
    },
    {
      nombre: 'Seguridad en APIs RESTful',
      descripcion: 'Implementar sanetización de entradas, límites de tasa (rate limiting) y encabezados de seguridad ayuda a mitigar vulnerabilidades comunes.',
      resumen: 'Mitigación de riesgos y protección en endpoints REST.'
    },
    {
      nombre: 'Monitoreo y Logging de Servicios Backend',
      descripcion: 'Contar con trazabilidad de errores e historial de logs estructurados facilita el diagnóstico rápido de incidentes en producción.',
      resumen: 'Observabilidad y diagnóstico en producción.'
    }
  ];

  for (const post of initialPosts) {
    await prisma.post.create({
      data: post
    });
    console.log(`Creado: ${post.nombre}`);
  }

  console.log('Seeder ejecutado con éxito.');
}

main()
  .catch((e) => {
    console.error('Error en el seeder:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });