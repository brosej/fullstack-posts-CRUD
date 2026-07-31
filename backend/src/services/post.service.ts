import { IPostRepository } from '../interfaces/post.interface';
import { PrismaErrorCode } from '../constants/prisma-errors';   

export class PostService {
  constructor(private readonly postRepository: IPostRepository) {}

  private generarResumen(nombre: string, descripcion: string): string {
    const palabrasNombre = nombre.trim().split(/\s+/);
    const palabrasDescripcion = descripcion.trim().split(/\s+/);
    
    return `${palabrasNombre[0]} ${palabrasDescripcion.slice(0, 2).join(' ')}`;
  }

  async getAllPosts(searchTerm?: string) {
    return await this.postRepository.findAll(searchTerm);
  }

  async createPost(data: { nombre: string; descripcion: string }) {
    const resumenGenerado = this.generarResumen(data.nombre, data.descripcion);

    return await this.postRepository.create({ ...data, resumen: resumenGenerado });
  }

  async deletePost(id: number) {
    try {
      return await this.postRepository.deleteById(id);
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes('no fue encontrado')) {
        throw new Error(`El post con ID ${id} no fue encontrado.`);
      }
      throw error;
    }
  }
}