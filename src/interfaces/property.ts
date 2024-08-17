export interface Property {
  _id: string;
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
  image: string;
  images?: string[];
}

export enum PackageType {
  Premium = "premium",
  Standard = "standard",
  Basic = "basic",
}
