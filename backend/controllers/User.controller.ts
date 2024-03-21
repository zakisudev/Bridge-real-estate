import e, { Request, Response } from "express";
import evalidate from "evalidate";
import { User } from "../models";
import UserService from "../services/User.service";

class UserController {
  static async create(req: Request, res: Response) {
    const Schema = new evalidate.schema({
      name: evalidate.string().required("Name is required"),
      email: evalidate
        .string()
        .required("Email is required")
        .email("Invalid email"),
      password: evalidate.string().required("Password is required"),
    });
    const result = Schema.validate(req.body);
    if (result.isValid) {
      const existingUser = await User.findOne({
        where: { email: req.body.email },
      });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      UserService.create(req.body)
        .then((result: User) => {
          res.status(201).json(result);
        })
        .catch((error: Error) => {
          res.status(400).json({ message: error.message });
        });
    } else {
      let errors: any = {};
      result.errors.forEach((err: any) => {
        errors[err.field] = err.message;
      });
    }
  }
}

export default UserController;
