export type Coordinates = {
  x: number;
  y: number;
};

export type Tag = {
  id: number;
  category: string;
  price: number;
  productName: string;
  coordinates: Coordinates;
};
