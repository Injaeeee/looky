export enum Category {
  OUTER = "OUTER",
  TOP = "TOP",
  PANTS = "PANTS",
  NEAT = "NEAT",
  JEANS = "JEANS",
  SHOES = "SHOES",
  BAG = "BAG",
  ACC = "ACC",
}

export type Coordinates = {
  x: number;
  y: number;
};

export type Tag = {
  id: number;
  category: Category;
  price: number;
  productName: string;
  coordinates: Coordinates;
};
