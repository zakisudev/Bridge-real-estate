export interface Property {
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
}
export interface PropertyResponse {
  properties: [Property];
  pagination: {
    totalPages: number;
    prevPage: number | null;
    nextPage: number | null;
    totalItems: number;
    currentPage: number;
    pageSize: number;
  };
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
  properties: PropertyResponse["properties"] | [];
  property: Property | null;
  pagination: {
    totalPages: number;
    prevPage: number | null;
    nextPage: number | null;
    totalItems: number;
    currentPage: number;
    pageSize: number;
  };
  loading: boolean;
  error: string | null;
}

export interface PropertyModel {
  id?: number;
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

export interface PaginationProps {
  pagination: {
    totalPages: number;
    prevPage: number | null;
    nextPage: number | null;
    totalItems: number;
    currentPage: number;
    pageSize: number;
  };
  onPageChange: (page: number) => void;
}
