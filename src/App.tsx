import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { Products } from "./pages/products/Products";
import { ProductDetails } from "./pages/productsDetail/ProductsDetails";
import { CreateProduct } from "./pages/createProduct/CreateProduct";

export const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/create-product" element={<CreateProduct />} />
      </Routes>
    </>
  );
};
