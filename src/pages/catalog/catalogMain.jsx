import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { getCatalog } from "../../services/productService";
import ProductCard from "../../components/product/productCard";

const PAGE_SIZE = 20;

const CatalogMain = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const category = searchParams.get("category") || undefined;

  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);

      try {
        const data = await getCatalog({
          category,
          page: currentPage,
          limit: PAGE_SIZE,
        });

        setProducts(data.items);
        setTotalPages(data.total_pages);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [category, currentPage]);

  const changePage = (page) => {
    const nextSearchParams = new URLSearchParams(searchParams);

    nextSearchParams.set("page", page.toString());
    setSearchParams(nextSearchParams);
  };

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        Cargando productos...
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center px-4 sm:px-6 lg:px-8">
      <section className="grid w-full max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>

      {totalPages > 1 && (
        <nav className="mt-8 flex items-center gap-2">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => changePage(currentPage - 1)}
            className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Anterior
          </button>

          {Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;

            return (
              <button
                key={page}
                type="button"
                onClick={() => changePage(page)}
                className={`rounded-lg border px-4 py-2 ${
                  page === currentPage
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-900"
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => changePage(currentPage + 1)}
            className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Siguiente
          </button>
        </nav>
      )}
    </main>
  );
};

export default CatalogMain;
