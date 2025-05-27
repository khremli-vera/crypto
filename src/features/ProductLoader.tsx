// import { useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { useProductStore } from "@/shared/stores/productStore";
// import { fetchProducts } from "@/shared/api/products";

// export const ProductLoader = () => {
//    const setProducts = useProductStore((state) => state.setProducts);

//    const { data, isSuccess } = useQuery({
//       queryKey: ["products"],
//       queryFn: fetchProducts,
//       staleTime: 1000 * 60 * 5,
//    });

//    useEffect(() => {
//       if (isSuccess && data) {
//          setProducts(data);
//       }
//    }, [isSuccess, data, setProducts]);

//    return null;
// };
