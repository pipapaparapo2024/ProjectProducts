export interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  isFavorite?: boolean;
  rating: Rating;
}

export interface ProductCreate {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface ProductsState {
  products: Product[];
  initialized: boolean;
  loading: boolean;
  error: string | null;
  getProducts: () => Promise<void>;
  deleteProduct: (productId: number) => void;
  toggleFavorite: (productId: number) => void;
  addProduct: (product: ProductCreate) => void;
  updateProduct: (productId: number, updatedData: Partial<Product>) => void;
}
