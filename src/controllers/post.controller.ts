import BaseController from "../policies/BaseController";
import { Request, Response, Next } from "restify";
import { IPost } from "src/models/dbtypes";
import { PostService } from "./../services/post.service";

export default class PostController extends BaseController {
  constructor(private postService = new PostService()) {
    super();
  }

  addPost = async (req: Request, res: Response, next: Next) => {
    try {
      let Post: IPost = req.body;
      if (Post.title == null) throw "Give a title first!";

      let result = await this.postService.addPost(Post);
      return res.send(result);

      // when no error
      // todo call service for data upodate in database
    } catch (error) {
      this.ErrorResult(error, req, res, next);
    }
  };
  getOne = async (req: Request, res: Response, next: Next) => {
    try {
      let post: IPost = req.body;
      let postId: IPost = req.params.id;
      let result = await this.postService.getOne(postId);
      res.send(result);

      // when no error
      // todo call service for data upodate in database
    } catch (error) {
      this.ErrorResult(error, req, res, next);
    }
  };

  getAll = async (req: Request, res: Response, next: Next) => {
    try {
      let Post: IPost = req.body;
      let result = await this.postService.getAll(Post);
      res.send(result);

      // when no error
      // todo call service for data upodate in database
    } catch (error) {
      this.ErrorResult(error, req, res, next);
    }
  };

  updatePost = async (req: Request, res: Response, next: Next) => {
    try {
      let post = req.body;
      let postId = req.params.id;
      if (postId == null) throw "post not found";
      let result = await this.postService.updatePost(postId, post);
      return res.send(result);
    } catch (error) {
      this.ErrorResult(error, req, res, next);
    }
  };

  deletePost = async (req: Request, res: Response, next: Next) => {
    try {
      let post = req.body;
      let postId = req.params.id;
      if (postId == null) throw "post not found";
      let result = await this.postService.deletePost(postId);
      console.log(result);
      // return this.RESP(true, "post added");
    } catch (error) {
      this.log.error(error);
      throw error;
    }
  };
}
