import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { TUser } from "../utils/types";
import User from "../models/User";

export default class UsersController {
  /**
   * POST: /sign-up
   */
  static async SignUp(req: Request, res: Response) {
    try {
      await User.create(req.body as TUser);

      res.status(201).json({
        message: "User created successfully",
      });
    } catch (error: any) {
      res.status(500).json({
        message: `Error trying to sign-up a new user: ${error.message}`,
      });
    }
  }

  /**
   * POST: /user
   */
  static async Login(req: Request, res: Response) {
    try {
      const { email, password } = req.body as TLogin;

      const user = await User.getByEmail(email);

      if (user == null)
        return res.status(404).json({
          message: "Incorrect credentials",
        });

      const isPasswordCorrect = bcrypt.compareSync(password, user.password);
      if (!isPasswordCorrect)
        return res.status(404).json({
          message: "Incorrect credentials",
        });

      const { password: _, ..._user } = user;

      res.json({
        message: "Logged in successfully",
        user: _user,
      });
    } catch (error: any) {
      res.status(500).json({
        message: `Error trying to login: ${error.message}`,
      });
    }
  }
}

type TLogin = { email: string; password: string };
