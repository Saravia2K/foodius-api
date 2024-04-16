import { Request, Response } from "express";

export default class IndexController {
  static index(_: Request, res: Response) {
    res.json({
      message: "SERVER IS RUNNING CORRECTLY",
    });
  }
}
