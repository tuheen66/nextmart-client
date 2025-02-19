import { ICategory } from "@/types";
import Image from "next/image";

const CategoryCard = ({ category }: { category: ICategory }) => {
  return (
    <div className="bg-white bg-opacity-50 border-2 border-white rounded-2xl text-center p-6 h-44">
      <Image
        src={category?.icon || "https://res.cloudinary.com/dq3vrrmre/image/upload/v1739895325/8ele8pmu1cw-1739895322885-icon-8748459.png"}
        width={100}
        height={150}
        alt="category icon"
        className="mx-auto"
      />
      <h3 className="text-lg font-semibold truncate mt-3">{category?.name}</h3>
    </div>
  );
};

export default CategoryCard;
