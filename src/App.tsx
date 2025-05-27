import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router-dom";

import AppRoutes from "@/AppRoutes";
import Header from "@/uikits/Header/Header";
// import { ProductLoader } from "./features/ProductLoader";

const queryClient = new QueryClient();

function App() {
   return (
      <QueryClientProvider client={queryClient}>
         {/* <ProductLoader /> */}
         <React.StrictMode>
            <BrowserRouter>
               <Header />
               <AppRoutes />
            </BrowserRouter>
         </React.StrictMode>

         <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
   );
}

export default App;
