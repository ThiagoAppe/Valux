import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import CategoryCard from "./categoryCard";
import { getCategories } from "../../services/categoriesService";

const MOBILE_TABLET_LIMIT = 6;
const DESKTOP_LIMIT = 8;

const getEvenCategories = (categories, limit) => {
  const limitedCategories = categories.slice(0, limit);

  return limitedCategories.slice(0, limitedCategories.length - (limitedCategories.length % 2));
};

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  const mainCategories = categories.filter(
    (category) => category.parent_id === null,
  );

  const mobileTabletCategories = getEvenCategories(
    mainCategories,
    MOBILE_TABLET_LIMIT,
  );

  const desktopCategories = mainCategories.slice(0, DESKTOP_LIMIT);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response);
      } catch (err) {
        setError(err);
      }
    };

    loadCategories();
  }, []);

  return (
    <section>
      <motion.div
        className="mb-14 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-black">
          COLECCIONES
        </p>

        <h2 className="font-heading text-4xl font-medium text-black md:text-5xl">
          Nuestras Categorías
        </h2>
      </motion.div>

      {error && (
        <p className="text-center text-sm text-red-500">
          No fue posible cargar las categorías.
        </p>
      )}

      {!error && (
        <>
          {/* Mobile / Tablet */}
          <div className="grid grid-cols-2 gap-4 lg:hidden">
            {mobileTabletCategories.map((category) => (
              <CategoryCard
                key={category.slug}
                name={category.name}
                image={category.image_url}
              />
            ))}
          </div>

          {/* Desktop */}
          <div className="flex gap-6 overflow-x-auto lg:flex-nowrap">
            {desktopCategories.map((category) => (
              <div key={category.slug} className="w-1/5 shrink-0">
                <CategoryCard
                  name={category.name}
                  image={category.image_url}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}