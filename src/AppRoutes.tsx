import { useRoutes } from "react-router-dom";
import Home from "@/pages/Home/Home";
import Trade from "@/pages/Trade/Trade";
import { ROUTES } from "@/shared/utils/routes";
import BaseLayout from "./components/BaseLayout/BaseLayout";

const AppRoutes = () => {
   return useRoutes([
      {
         element: <BaseLayout />,
         children: [
            { path: "/", element: <Home /> },
            { path: ROUTES.TRADE, element: <Trade /> },
         ],
      },
   ]);
};

export default AppRoutes;
