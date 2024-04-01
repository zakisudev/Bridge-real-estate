import { Request, Response } from "express";
import evalidate from "evalidate";
import { Property } from "../models";
import PropertyService from "../services/Property.service";

/**
 * Controller class for managing property-related operations.
 */
class PropertyController {
  /**
   * Creates a new property.
   *
   * @param req - The request object containing the property data.
   * @param res - The response object used to send the result back to the client.
   */
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
      offer: evalidate.boolean().required(),
      imageUrls: evalidate.array().required(),
    });

    const result = Schema.validate(req.body);
    if (result.isValid) {
      try {
        const property = await PropertyService.create(req.body, req);
        res.status(201).json({
          property,
          success: true,
          message: "Property created successfully",
        });
      } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
      }
    } else {
      let errors: any = {};
      result.errors.forEach((err: any) => {
        errors[err.field] = err.message;
      });
      res.status(400).json({ message: errors });
    }
  }

  /**
   * Retrieves all properties based on the provided query parameters.
   *
   * @param req - The request object.
   * @param res - The response object.
   * @returns A JSON response containing an array of properties.
   */
  static async findAll(req: Request, res: Response) {
    const query = req.query;

    PropertyService.findAll(query)
      .then((result: Property[]) => {
        res.status(200).json(result);
      })
      .catch((error: Error) => {
        res.status(400).json({ success: false, message: error.message });
      });
  }

  /**
   * Finds a property by its ID.
   *
   * @param req - The request object.
   * @param res - The response object.
   */
  static async findById(req: Request, res: Response) {
    const id = req.params.id;

    PropertyService.findById(id)
      .then((result: Property) => {
        res.status(200).json({ property: result, success: true, message: "" });
      })
      .catch((error: Error) => {
        res.status(400).json({ success: false, message: error.message });
      });
  }

  /**
   * Updates a property based on the provided request body.
   *
   * @param req - The request object containing the property ID and updated data.
   * @param res - The response object used to send the result back to the client.
   */
  static async update(req: Request, res: Response) {
    const Schema = new evalidate.schema({
      id: evalidate.number().required(),
    });
    const result = Schema.validate(req.body);
    if (result.isValid) {
      PropertyService.update(req.body.id, req.body)
        .then((result: Property) => {
          res.status(200).json(result);
        })
        .catch((error: Error) => {
          res.status(400).json({ success: false, message: error.message });
        });
    } else {
      let errors: any = {};
      result.errors.forEach((err: any) => {
        errors[err.field] = err.message;
      });
      res.status(400).json({ success: false, message: errors });
    }
  }

  /**
   * Retrieves a paged list of properties with pagination information.
   *
   * @param req - The request object.
   * @param res - The response object.
   * @returns A JSON response containing the paged properties and pagination information.
   */
  static async getPaged(req: Request, res: Response) {
    const { page: pageQuery, limit: limitQuery, search, ...filter } = req.query;
    const page = Number(pageQuery) || 1;
    const limit = Number(limitQuery) || 9;

    PropertyService.getPagedWithCount(page, limit, filter, search as string)
      .then(({ properties, count }) => {
        const totalPages =
          Object.keys(filter).length > 0 || search
            ? Math.ceil(properties.length / limit)
            : Math.ceil(count / limit);
        const prevPage = page > 1 ? page - 1 : null;
        const nextPage = page < totalPages ? page + 1 : null;
        res.status(200).json({
          properties,
          pagination: {
            totalPages,
            prevPage,
            nextPage,
            totalItems: properties.length,
            currentPage: page,
            pageSize: limit,
          },
        });
      })
      .catch((error: Error) => {
        res.status(400).json({ success: false, message: error.message });
      });
  }

  /**
   * Deletes a property by its ID.
   *
   * @param req - The request object.
   * @param res - The response object.
   */
  static async delete(req: Request, res: Response) {
    const id = req.params.id;

    PropertyService.delete(id)
      .then((result: Property) => {
        res.status(200).json(result);
      })
      .catch((error: Error) => {
        res.status(400).json({ success: false, message: error.message });
      });
  }
}

export default PropertyController;
