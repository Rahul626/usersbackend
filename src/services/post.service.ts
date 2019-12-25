import { IPost } from "./../models/dbtypes.d";
import BaseService from "./../policies/BaseService";
import { db } from "../models/db";

export default class UserService extends BaseService {
  constructor() {
    super();
  }

  getOne = async (PostId: string) => {
    try {
      let result = await db.posts.findOne(PostId);
      if (result == null) throw "post not found";
      return this.RESP(true, "post not found");
    } catch (error) {
      this.log.error(error);
      throw error;
    }
  };
  getAll = async (Posts: string) => {
    try {
      let result = await db.posts.find(Posts);
      if (result == null) throw "post not found";
      return this.RESP(true, "post not found");
    } catch (error) {
      this.log.error(error);
      throw error;
    }
  };

  addPost = async (Posts: IPost) => {
    try {
      let result = await db.posts.create(Posts);
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
      return this.RESP(true, "post not updated ", result);
    } catch (error) {
      this.log.error(error);
      throw error;
    }
  };

  deletePost = async (PostId: string) => {
    try {
      let result = await db.posts.findByIdAndRemove(PostId);
      if (result == null) throw "post not found";

      return this.RESP(true, "post added");
    } catch (error) {
      this.log.error(error);
      throw error;
    }
  };
}
