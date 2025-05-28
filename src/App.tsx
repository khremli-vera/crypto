import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router-dom";

import AppRoutes from "@/AppRoutes";

const queryClient = new QueryClient();

function App() {
   return (
      <QueryClientProvider client={queryClient}>
         <React.StrictMode>
            <BrowserRouter>
               <AppRoutes />
            </BrowserRouter>
         </React.StrictMode>
         <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
   );
}

export default App;
