import { Router } from "express";
import { PostController } from "../controllers/post.controller";
import { PostService } from "../services/post.service";
import { PostRepository } from "../repositories/post.repository";
import { validate } from "../middlewares/validateResource";
import { createPostSchema, deletePostSchema } from "../schemas/post.schema";

const router = Router();

const postRepository = new PostRepository();
const postService = new PostService(postRepository);
const postController = new PostController(postService);

router.get("/", postController.getAllPosts);
router.post("/", validate(createPostSchema), postController.createPost);
router.delete("/:id", validate(deletePostSchema), postController.deletePost);

export default router;

