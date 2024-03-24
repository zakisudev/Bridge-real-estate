import { Request, Response } from "express";
import evalidate from "evalidate";
import { Property } from "../models";
import PropertyService from "../services/Property.service";

class PropertyController {
  static async create(req: Request, res: Response) {
    const Schema = new evalidate.schema({
      title: evalidate.string().required(),
      description: evalidate.string().required(),
      address: evalidate.string().required(),
      bathrooms: evalidate.number().required(),
      bedrooms: evalidate.number().required(),
      furnished: evalidate.boolean().required(),
      parking: evalidate.boolean().required(),
      size: evalidate.number().required(),
      discountedPrice: evalidate.number().required(),
      regularPrice: evalidate.number().required(),
      type: evalidate.string().required(),
      offer: evalidate.string().required(),
      imageUrls: evalidate.array().required(),
    });

    const result = Schema.validate(req.body);
    if (result.isValid) {
      PropertyService.create(req.body, req)
        .then((result: Property) => {
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
}

export default PropertyController;
