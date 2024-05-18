interface IParams {
  userId: number;
  amount: number;
}

interface Product {
  title: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  thumbnail: string;
}

export { IParams, Product };
