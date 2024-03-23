export interface PropertyResponse {
  id: string;
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
  offer: boolean;
  imageUrls: string[];
  createdAt: string;
  updatedAt: string;
}

export interface PropertyState {
  properties: PropertyResponse[] | null;
  loading: boolean;
  error: string | null;
}

export interface PropertyModel {
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
  offer: boolean;
  imageUrls: string[];
}
