import Property from '../models/Property';
import { Request, Response } from 'express';

// @desc    Get all properties
// @route   GET /api/v1/property
// @access  Public
const getProperties = async (req: Request, res: Response) => {
  try {
    const properties = await Property.findAll();

    res.status(200).json({ properties, success: true });
  } catch (error: any) {
    res.status(404).send({ message: error.message, success: false });
  }
};

// @desc    Get single property
// @route   GET /api/v1/property/:id
// @access  Public
const getProperty = async (req: Request, res: Response) => {
  try {
    const property = await Property.findByPk(req.params.id);

    if (!property) {
      return res
        .status(200)
        .json({ message: 'Property not found', success: false });
    }

    res.status(200).json({ property, success: true });
  } catch (error: any) {
    res.status(404).send({ message: error.message, success: false });
  }
};

// @desc    Create property
// @route   POST /api/v1/property
// @access  Private
const createProperty = async (req: Request, res: Response) => {
  try {
    const property = await Property.create(req.body);

    res.status(201).json({ property, success: true });
  } catch (error: any) {
    res.status(400).send({ message: error.message, success: false });
  }
};

// @desc    Update property
// @route   PUT /api/v1/property/:id
// @access  Private
const updateProperty = async (req: Request, res: Response) => {
  try {
    const property = await Property.findByPk(req.params.id);

    if (!property) {
      return res
        .status(200)
        .json({ message: 'Property not found', success: false });
    }

    await property.update(req.body);

    res.status(200).json({ property, success: true });
  } catch (error: any) {
    res.status(400).send({ message: error.message, success: false });
  }
};

// @desc    Delete property
// @route   DELETE /api/v1/property/:id
// @access  Private
const deleteProperty = async (req: Request, res: Response) => {
  try {
    const property = await Property.findByPk(req.params.id);

    if (!property) {
      return res
        .status(200)
        .json({ message: 'Property not found', success: false });
    }

    await property.destroy();

    res.status(200).json({ success: true });
  } catch (error: any) {
    res.status(400).send({ message: error.message, success: false });
  }
};

export {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
};
