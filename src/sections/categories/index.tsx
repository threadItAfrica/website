 
import { CategoryDisplay } from "./CategoryDisplay";
// import { Sustainability } from "./Sustainability";
// import { GreenFashion } from "./GreenFashon";
// import { Eco } from "./Eco";
import { client } from "@/sanity/client";
import { Category } from "@/utils/interface";

const QUERY = `*[_type == "category"] {
  _id,
  title,
  description,              
  slug, 
  mainImage
}`;

export const Categories = async () => {
  const categories = await client.fetch<Category[]>(QUERY, {}, {
    next: {
      revalidate: 60
    }
  });

  return (
    <section className="w-full mx-auto max-w-[2024px]">
      <div>
        {categories.map((category) => {
          return <CategoryDisplay key={category._id} category={category._id} />;
        
         })}
      </div>
    </section>
  );
};

export default Categories;

  // switch (category.title) {
          //   case "African Fashion History": 
          //   return 
          //   case "Sustainability for Fashion Brands":
          //     return <Sustainability key={category._id} category={category._id} />;
          //   case "Green Fashion 101":
          //     return <GreenFashion key={category._id} category={category._id} />;
          //   case "Eco Trends & Innovations":
          //     return <Eco key={category._id} category={category._id} />;     
          //   default:
          //     break;
          // }