import ProductCard from "@/components/ui/core/ProductCard";
import { IProduct } from "@/types";
import FilterSidebar from "./filterSidebar";

const AllProducts = ({ products }: { products: IProduct[] }) => {
  return (
    <div className="flex gap-8 my-10">
      <div>
        <FilterSidebar />
        </div>
      <div>
        <div className="grid grid-cols-4 gap-8">
          {products?.map((product: IProduct, idx: number) => (
            <ProductCard key={idx} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
