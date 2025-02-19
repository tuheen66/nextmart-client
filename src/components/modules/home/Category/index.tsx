import { Button } from "@/components/ui/button";
import CategoryCard from "@/components/ui/core/CategoryCard";
import { getAllCategories } from "@/services/Category";
import { ICategory } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";

const Category = () => {
  const [categories, setCategories] = useState<ICategory[] | []>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [categoriesData] = await Promise.all([
        getAllCategories(), //* getting all categories from services server function
      ]);

      setCategories(categoriesData?.data); //*setting categories in categories select
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto my-20">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl">Category</h2>
        <Link href="/products">
          <Button variant="outline" className="rounded-full">
            View All
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-6 gap-8 my-5">
        {Array(12)
          .fill(categories?.[0])
          .map((category: ICategory, idx: number) => (
            <CategoryCard key={idx} category={category} />
          ))}
      </div>
    </div>
  );
};

export default Category;
