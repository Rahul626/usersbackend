import { IPost } from "./../models/dbtypes.d";
import BaseService from "./../policies/BaseService";
import { db } from "../models/db";

export class PostService extends BaseService {
  constructor() {
    super();
  }

  getOne = async (PostId: IPost) => {
    try {
      let result = await db.posts.findById(PostId);
      if (result == null) throw "post not found";
      return this.RESP(true, "post not found");
    } catch (error) {
      this.log.error(error);
      throw error;
    }
  };
  getAll = async (Posts: IPost) => {
    try {
      let result = await db.posts.find();
      if (result == null) throw "post not found";
      return result;
      // return this.RESP(true, "post not found");
    } catch (error) {
      this.log.error(error);
      throw error;
    }
  };

  addPost = async (posts: IPost) => {
    try {
      let result = await db.posts.create(posts);
      return this.RESP(true, "post added", result);
    } catch (error) {
      this.log.error(error);
      throw error;
    }
  };

  updatePost = async (PostId: string, Post: IPost) => {
    try {
      let result = await db.posts.findByIdAndUpdate(PostId, Post, { new: true });
      if (result == null) throw "post not found";

      return this.RESP(true, "post updated ", result);
    } catch (error) {
      this.log.error(error);
      throw error;
    }
  };

  deletePost = async (PostId: string) => {
    try {
      let result = await db.posts.findByIdAndRemove(PostId).exec();
      if (result == null) throw "post not found";

      return this.RESP(true, "post not deleted yet");
    } catch (error) {
      this.log.error(error);
      throw error;
    }
  };
}
