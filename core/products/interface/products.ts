import { User } from "@/core/auth/interface/user";

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  slug: string;
  stock: number;
  sizes: Size[];
  gender: Gender;
  tags: string[];
  images: string[];
  user?: User;
}

export enum Size {
  L = "L",
  M = "M",
  S = "S",
  Xl = "XL",
  Xs = "XS",
  Xxl = "XXL",
  Xxxl = "XXXL",
}

export enum Gender {
  Men = "men",
  Women = "women",
  Kids = "kids",
}
