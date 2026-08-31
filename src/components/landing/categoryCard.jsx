export default function CategoryCard({ name, image }) {
  return (
    <div className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl shadow-md transition-shadow duration-500 hover:shadow-xl">
      <img
        src={image}
        alt={name}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-black/30 transition-colors duration-500 group-hover:bg-black/40" />

      <div className="absolute inset-0 flex items-center justify-center">
        <h3 className="px-3 text-center font-heading text-xl font-medium tracking-wide text-white md:text-2xl">
          {name}
        </h3>
      </div>
    </div>
  );
}