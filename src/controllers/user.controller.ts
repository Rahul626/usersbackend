import { IUser } from "./../models/dbtypes.d";
import UserService from "./../services/user.service";
import BaseController from "../policies/BaseController";
import { Request, Response, Next } from "restify";

export default class UserController extends BaseController {
  constructor(private userService = new UserService()) {
    super();
  }

  addUser = async (req: Request, res: Response, next: Next) => {
    try {
      let user: IUser = req.body;
      if (user.name == null) throw "name is required";
      if (user.email == null) throw "email is required";
      //emaill format
      if (!/^[\-0-9a-zA-Z\.\+_]+@[\-0-9a-zA-Z\.\+_]+\.[a-zA-Z]{2,}$/.test(String(user.email))) throw " email not valid!  writen a email addresss only";
      //password format
      // if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(String(user.password))) throw "PLease follow password format!";

      // if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(String(user.password))) throw "PLease follow password format!";
      if (user.password == null) throw "password field emapty";

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
      if (!fetchedUser.email == null) throw " email not found!";
      if (!fetchedUser.password == null) throw " password not found!";
      let person = await this.userService.userLogin(fetchedUser);

      return res.send(person);
      console.log(fetchedUser);
    } catch (error) {
      this.ErrorResult(error, req, res, next);
    }
  };

  allusers = async (req: Request, res: Response, next: Next) => {
    try {
      let users: IUser = req.body;
      let result = await this.userService.allusers(users);
      res.send(result);

      // when no error
      // todo call service for data upodate in database
    } catch (error) {
      this.ErrorResult(error, req, res, next);
    }
  };
}
