import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { PRODUCTS as INITIAL_PRODUCTS } from "@/lib/mock-data";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
}

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, updates: Omit<Product, "id">) => void;
  deleteProduct: (id: string) => void;
}

const STORAGE_KEY = "qahwa-products";
const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window === "undefined") return INITIAL_PRODUCTS;

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return INITIAL_PRODUCTS;

    try {
      const parsed = JSON.parse(stored) as Product[];
      return parsed.length > 0 ? parsed : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const addProduct = (product: Omit<Product, "id">) => {
    setProducts((current) => [
      ...current,
      {
        ...product,
        id: `p-${Date.now()}`,
      },
    ]);
  };

  const updateProduct = (id: string, updates: Omit<Product, "id">) => {
    setProducts((current) =>
      current.map((product) => (product.id === id ? { ...product, ...updates } : product))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((current) => current.filter((product) => product.id !== id));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useProducts must be used within a ProductProvider");
  return context;
}
