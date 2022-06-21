import { ImageData } from "./ImageData";
export interface Product {
  basePrice: number;
  description: any;
  id: string;
  image: ImageData;
  name: string;
  slug: string;
}
