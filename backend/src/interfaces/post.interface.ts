import { Post, Prisma } from "@prisma/client";

export interface IPostRepository {
  findAll(searchTerm?: string): Promise<Post[]>;
  create(data: Prisma.PostCreateInput): Promise<Post>;
  deleteById(id: number): Promise<Post>;
}