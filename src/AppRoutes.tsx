import { useRoutes } from "react-router-dom";
import Home from "@/pages/Home/Home";
import Trade from "@/pages/Trade/Trade";
import { ROUTES } from "@/shared/utils/routes";
import BaseLayout from "@/components/BaseLayout/BaseLayout";
import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import { useAuthStore } from "@/shared/stores/authStore";

const AppRoutes = () => {
   const { isAuthenticated } = useAuthStore();
   return useRoutes([
      {
         element: <BaseLayout />,
         children: [
            { path: "/", element: <Home /> },
            {
               path: ROUTES.TRADE,
               element: (
                  <PrivateRoute isAuthenticated={isAuthenticated}>
                     <Trade />
                  </PrivateRoute>
               ),
            },
         ],
      },
   ]);
};

export default AppRoutes;
