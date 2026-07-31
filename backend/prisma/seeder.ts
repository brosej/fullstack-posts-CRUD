import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Ejecutando seeder de la base de datos...');

  const postsIniciales = [
    {
      nombre: 'Primer post de prueba',
      descripcion: 'Esta es la primera publicación automatizada para probar el challenge. Esta funcionando correctamente.',
      resumen: 'Primer Esta es' 
    },
    {
      nombre: 'La digitalización en la educación',
      descripcion: 'Cada dia más instituciones educativas están adoptando herramientas digitales para mejorar la enseñanza y el aprendizaje.',
      resumen: 'La Cada dia'
    },
    {
      nombre: 'Atencion a todos los desarrolladores',
      descripcion: 'Las nuevas tecnologías de desarrollo web están cambiando rápidamente. Mantente actualizado con las últimas tendencias y herramientas.',
      resumen: 'Atencion Las nuevas tecnologías'
    }
  ];

  for (const post of postsIniciales) {
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