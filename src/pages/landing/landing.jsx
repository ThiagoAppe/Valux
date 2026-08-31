import Categories from "../../components/landing/Categories";
// import FeaturedProducts from "./productosDestacados";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="-mx-4 relative h-[60vh] overflow-hidden md:h-full">
      <img
        src="/Landing/landingBG.webp"
        alt=""
        className="relative z-10 h-full w-full object-cover object-center"
      />

      <div className="absolute inset-x-0 bottom-0 z-10 h-32 bg-linear-to-t from-background via-background/70 to-transparent" />

      <img
        src="/Landing/VALUX-DECO.webp"
        alt="Valux Deco"
        className="absolute inset-0 z-20 h-full w-full -translate-y-16 object-contain object-center md:translate-y-0"
      />

      <motion.div
        className="absolute inset-x-0 bottom-10 z-30 flex justify-center md:bottom-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Link
          to="/catalog"
          className="group flex items-center gap-3 rounded-full bg-primary px-8 py-3 text-xl font-medium tracking-wide text-white transition-all duration-300 hover:bg-primary-dark hover:shadow-lg"
        >
          <span>Ver catálogo</span>

          <ArrowRight
            className="size-5 transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </motion.div>
    </section>
  );
};

const Landing = () => {
  return (
    <div>
      <section>
        <div className="flex-1 md:min-h-dvh mb-4">
          <Hero />
        </div>
        <Categories />
        {/* <FeaturedProducts/> */}
      </section>
    </div>
  );
};

export default Landing;
