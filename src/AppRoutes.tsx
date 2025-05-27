import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home/Home";
import Trade from "@/pages/Trade/Trade";
import { ROUTES } from "@/shared/utils/routes";

const AppRoutes = () => {
   return (
      <Routes>
         <Route index element={<Home />} />
         <Route path={ROUTES.TRADE} element={<Trade />} />
      </Routes>
   );
};

export default AppRoutes;
