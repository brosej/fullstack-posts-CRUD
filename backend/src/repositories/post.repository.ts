import prisma from '../config/prisma';
import { Prisma } from '@prisma/client';
import { IPostRepository } from '../interfaces/post.interface';

export class PostRepository implements IPostRepository {
  
  async findAll(searchTerm?: string) {

    const where = searchTerm ? {
      OR: [
        { nombre: { contains: searchTerm } },
        { descripcion: { contains: searchTerm } }
      ]
    } : {};

    return await prisma.post.findMany({
      where,
      orderBy: {
        fechaCreacion: 'desc' 
      }
    });
  }

  async create(data: Prisma.PostCreateInput) {
    return await prisma.post.create({
      data
    });
  }

  async deleteById(id: number) {
    return await prisma.post.delete({
      where: { id }
    });
  }
}