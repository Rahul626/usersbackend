import { IUser } from "./../models/dbtypes.d";
import BaseService from "./../policies/BaseService";
import { db } from "../models/db";

export default class UserService extends BaseService {
  constructor() {
    super();
  }

  addUser = async (user: IUser) => {
    try {
      let email = user.email;
      let found = await db.users.findOne({ email: email }).exec();
      if (found !== null) {
        throw "email registered already";
      }
      // if (found !== null) {
      //   return this.RESP(false, "email registered already");
      // }

      let result = await db.users.create(user);

      return this.RESP(true, "user created successfully", result);
    } catch (error) {
      this.log.error(error);
      throw error;
    }
  };
  userLogin = async (user: IUser) => {
    try {
      let result = await db.users.findOne({ email: user.email }).exec();
      if (this._.isNil(result)) return this.RESP(false, "You haven't registered");
      if (user.password !== result.password) return this.RESP(false, "password missmatch! try again");
      if (user.email !== result.email) return this.RESP(false, "You have not registered! ,register with us");
      return this.RESP(true, "user loggedin successfully", result);
    } catch (error) {
      this.log.error(error);
      throw error;
    }
  };

  allusers = async (user: IUser) => {
    try {
      let result = await db.users.find().exec();
      return result;
      return this.RESP(true, "users not found");
    } catch (error) {
      this.log.error(error);
      throw error;
    }
  };
}
