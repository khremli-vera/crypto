// import { IProduct } from "@/shared/types/product";
// import { assetsUrl } from "@/constants";

// export const fetchProducts = async (): Promise<IProduct[]> => {
//    const options = {
//       method: "GET",
//       headers: {
//          accept: "application/json",
//          "x-messari-api-key":
//             "zRFEGR6dkcxkm16FzMTaqh-epshNlFjKyfIJDpMGqMxVsncb",
//       },
//    };

//    fetch("https://data.messari.io/api/v2/assets?limit=10", options)
//       .then((res) => res.json())
//       .then((res) => console.log(res.data))
//       .catch((err) => console.error(err));

//    const res = await fetch(assetsUrl);
//    if (!res.ok) throw new Error("Failed to fetch products");
//    return res.json();
// };
