import BaseController from "../policies/BaseController";
import { Request, Response, Next } from "restify";
import { IPost } from "src/models/dbtypes";

export default class PostController extends BaseController {
  constructor() {
    super();
  }

  addPost = async (req: Request, res: Response, next: Next) => {
    try {
      let posts = new posts({
        title: req.body.title,
        content: req.body.content,
      });
      return posts;x
    } catch (error) {
      this.ErrorResult(error, req, res, next);
    }
  };

  updatePost = async (req: Request, res: Response, next: Next) => {
    try {
      let post;
      if (post.title == null) throw "title is required";
    } catch (error) {
      this.ErrorResult(error, req, res, next);
    }

    // deletePost = async (PostId: string) => {
    //   try {
    //     let result = await db.posts.findByIdAndRemove(PostId);
    //     if (result == null) throw "post not found";

    //     return this.RESP(true, "post added");
    //   } catch (error) {
    //     this.log.error(error);
    //     throw error;
    //   }
  };
}
