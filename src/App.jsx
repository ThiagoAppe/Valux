import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";

import Navbar from "./components/navbar/navbar";

import About from "./pages/about";
import NotFound from "./pages/notFound";

import Landing from "./pages/landing/landing";
import Catalog from "./pages/catalog/catalogMain";
import Product from "./pages/product/productMain";
import Categories from "./pages/categories/categoriesMain";
import Footer from "./components/footer/footer";


const MainLayout = () => {
  return (
    <div className="min-h-dvh flex flex-col bg-background text-neutral-100 overflow-hidden">
      <Navbar/>

      <main className="flex-1 flex w-full">
        <div className="px-4 py-4 w-full">
          <Outlet />
        </div>
      </main>

      <Footer className="mt-10" />
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:slug" element={<Product />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/about" element={<About />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
