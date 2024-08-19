export interface Property {
  _id: string;
  title: string;
  description: string;
  price: number;
  link: string;
  bedrooms: number;
  bathrooms: number;
  packageType: string;
  location: string;
  createdAt?: Date;
  updatedAt?: Date;
  expiresAt?: Date;
  area?: string;
  keyFeaturesAndAmenities?: string[];
  image: string;
  images?: string[];
  status?: string;
  propertyType?: string;
  owner?: string | null;
  isDeleted?: boolean;
}
