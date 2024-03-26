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
  user_id: number;
  user: {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    is_admin: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export interface PropertyState {
  properties: PropertyResponse[] | null;
  property: PropertyResponse | null;
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

export interface SearchProps {
  searchTerm: string;
  type: string;
  offer: boolean;
  parking: boolean;
  furnished: boolean;
}
