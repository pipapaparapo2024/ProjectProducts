import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import type { ProductsState, ProductCreate, Product } from "../types/Products";

export const useProductStore = create<ProductsState>()(
  persist(
    (set, get) => ({
      products: [],
      loading: false,
      error: null,
      initialized: false,

      getProducts: async () => {
        const state = get();

        if (state.products.length > 0 && state.initialized) {
          return;
        }

        set({ loading: true, error: null });
        try {
          const response = await axios("https://fakestoreapi.com/products");
          const productsWithFavorites = response.data.map(
            (product: Product) => ({
              ...product,
              isFavorite: false,
            })
          );
          set({
            products: productsWithFavorites,
            loading: false,
            initialized: true,
          });
        } catch (error) {
          set({
            error: "Failed to fetch products",
            loading: false,
          });
          console.error(error);
        }
      },
      updateProduct: (productId: number, updatedData: Partial<Product>) => {
        const state = get();
        set({
          products: state.products.map((product) =>
            product.id === productId ? { ...product, ...updatedData } : product
          ),
        });
      },
      addProduct: (productData: ProductCreate) => {
        const state = get();
        const lastId =
          state.products.length > 0
            ? Math.max(...state.products.map((p) => p.id))
            : 0;

        const newProduct: Product = {
          ...productData,
          id: lastId + 1,
          rating: {
            rate: 0,
            count: 0,
          },
          isFavorite: false,
        };

        set({ products: [...state.products, newProduct] });
      },

      deleteProduct: (productId: number) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== productId),
        }));
      },

      toggleFavorite: (productId: number) => {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === productId ? { ...p, isFavorite: !p.isFavorite } : p
          ),
        }));
      },

      clearStorage: () => {
        set({ products: [], initialized: false });
      },
    }),
    {
      name: "products-storage",
    }
  )
);
