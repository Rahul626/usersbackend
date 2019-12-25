import { IUser } from "./../models/dbtypes.d";
import UserService from "./../services/user.service";
import BaseController from "../policies/BaseController";
import { Request, Response, Next } from "restify";

export default class UserController extends BaseController {
  constructor(private userService = new UserService()) {
    super();
  }
  // authUser = async (req: Request, res: Response, next: Next) => {
  //   try {
  //     return res.send("hello there - " + (req.params.name ? req.params.name : ""));
  //   } catch (error) {
  //     this.ErrorResult(error, req, res, next);
  //   }
  // };
  addUser = async (req: Request, res: Response, next: Next) => {
    try {
      let user: IUser = req.body;
      if (user.name == null) throw "name is required";
      // when data is correct
      let result = await this.userService.addUser(user);
      return res.send(result);

      // when no error
      // todo call service for data upodate in database
    } catch (error) {
      this.ErrorResult(error, req, res, next);
    }
  };

  userLogin = async (req: Request, res: Response, next: Next) => {
    try {
      let fetchedUser: IUser = req.body;
      if (!fetchedUser.email == null) throw " email not registered!";
      if (!fetchedUser.password == null) throw " not registered!";
      let person = await this.userService.userLogin(fetchedUser, "user found", fetchedUser);

      return res.send(person);
      console.log(fetchedUser);
    } catch (error) {
      this.ErrorResult(error, req, res, next);
    }
  };
}
