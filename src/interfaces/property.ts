export interface Property {
  id: string;
  title: string;
  description: string;
  price: string;
  link: string;
  bedrooms: number;
  bathrooms: number;
  packageType: PackageType;
  location: string;
  createdAt?: Date;
  updatedAt?: Date;
  expiresAt?: Date;
  area?: string;
  keyFeaturesAndAmenities?: string[];
  images?: string[];
}

export enum PackageType {
  Premium = "premium",
  Standard = "standard",
  Basic = "basic",
}
