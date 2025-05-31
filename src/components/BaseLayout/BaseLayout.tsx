import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "@/shared/stores/authStore";

const BaseLayout = () => {
   const initializeAuth = useAuthStore((state) => state.initialize);

   useEffect(() => {
      initializeAuth();
   }, []);

   return <Outlet />;
};

export default BaseLayout;
