import { Request, Response, NextFunction } from 'express';
import { PostService } from '../services/post.service';

export class PostController {
  constructor(private readonly postService: PostService) {}
  
    getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const search = req.query.search as string | undefined;
            const posts = await this.postService.getAllPosts(search);

            res.status(200).json(posts)
        } catch (error) {
            next(error);
        }
    };

    createPost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const newPost = await this.postService.createPost(req.body);
            res.status(201).json(newPost);
        } catch (error) {
            next(error);
        }
    };
    
    deletePost = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id, 10);
            await this.postService.deletePost(id);
            res.status(204).send();
        } catch (error:unknown) {
            if(error instanceof Error && error.message.includes('no fue encontrado')) {
                res.status(404).json({ message: error.message });
                return;
            }
            next(error);
        }
    };
}