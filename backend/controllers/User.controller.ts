import e, { query, Request, Response } from "express";
import evalidate from "evalidate";
import { User } from "../models";
import UserService from "../services/User.service";
import UserDal from "../dals/User.dal";

class UserController {
  static async create(req: Request, res: Response) {
    const Schema = new evalidate.schema({
      username: evalidate.string().required(),
      firstName: evalidate.string().required(),
      lastName: evalidate.string().required(),
      phone: evalidate.string().required(),
      email: evalidate.string().required().email("Invalid email"),
      password: evalidate.string().required(),
    });
    const result = Schema.validate(req.body);
    if (result.isValid) {
      const existingUser = await UserDal.findOne({ email: req.body.email });
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
      res.status(400).json({ message: errors });
    }
  }

  static async findAll(req: Request, res: Response) {
    const query = req.query;
    UserService.findAll(query)
      .then((result: User[]) => {
        res.status(200).json(result);
      })
      .catch((error: Error) => {
        res.status(400).json({ message: error.message });
      });
  }

  static async findOne(req: Request, res: Response) {
    const id = req.params.id;
    UserService.findOne(id)
      .then((result: User) => {
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(404).json({ message: "User not found" });
        }
      })
      .catch((error: Error) => {
        res.status(400).json({ message: error.message });
      });
  }

  static async update(req: Request, res: Response) {
    const Schema = new evalidate.schema({
      id: evalidate.number().required(),
    });
    const result = Schema.validate(req.body);
    if (result.isValid) {
      UserService.update(req.body.id, req.body)
        .then((result: User) => {
          res.status(200).json(result);
        })
        .catch((error: Error) => {
          res.status(400).json({ message: error.message });
        });
    } else {
      let errors: any = {};
      result.errors.forEach((err: any) => {
        errors[err.field] = err.message;
      });
      res.status(400).json({ message: errors });
    }
  }

  static async getPaged(req: Request, res: Response) {
    const { page: pageQuery, limit: limitQuery } = req.query;
    const page = Number(pageQuery) || 1;
    const limit = Number(limitQuery) || 9;
    UserService.getPagedWithCount(page, limit)
      .then(({ user, count }) => {
        const totalPages = Math.ceil(count / limit);
        const prevPage = page > 1 ? page - 1 : null;
        const nextPage = page < totalPages ? page + 1 : null;
        res.status(200).json({
          user,
          pagination: {
            totalPages,
            prevPage,
            nextPage,
            totalItems: count,
            currentPage: page,
            pageSize: limit,
          },
        });
      })
      .catch((error: Error) => {
        res.status(400).json({ message: error.message });
      });
  }

  static async logout(req: Request, res: Response) {
    return res.status(200).json({ status: "success" });
  }

  static async delete(req: Request, res: Response) {
    const id = req.params.id;
    UserService.delete(id)
      .then((result: any) => {
        res.status(200).json(result);
      })
      .catch((error: Error) => {
        res.status(400).json({ message: error.message });
      });
  }
}

export default UserController;
