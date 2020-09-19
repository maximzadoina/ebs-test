export interface Category {
    id: string;
    name: string;
  }

export interface Product {
    category: Category;
    name: string;
    price: number;
    quantity?:number
  }