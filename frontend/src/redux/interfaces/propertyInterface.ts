export interface PropertyModel {
  id: number;
  title: string;
  description: string;
  address: string;
  bathrooms: number;
  bedrooms: number;
  furnished: boolean;
  parking: boolean;
  size: number;
  discountedPrice: number;
  regularPrice: number;
  type: string;
  offer: string;
  imageUrls: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PropertyState {
  property: PropertyModel | null;
  properties: PropertyModel[];
}

export interface Property {
  id: number;
  title: string;
  description: string;
  address: string;
  bathrooms: number;
  bedrooms: number;
  furnished: boolean;
  parking: boolean;
  size: number;
  discountedPrice: number;
  regularPrice: number;
  type: string;
  offer: string;
  imageUrls: string[];
}
