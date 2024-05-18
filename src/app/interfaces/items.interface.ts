interface IParams {
  id: string;
}

interface Item {
  title: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  thumbnail: string;
}

export { IParams, Item };
