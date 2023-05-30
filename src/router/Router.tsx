import { useContext, useEffect } from "react";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { HomePage, LoginPage, RepositoryPage } from "@/pages";
import { ControllersContext, StoresContext } from "@/context";
import { RoutePath } from "@/models";

export const AppRouter = observer(() => {
  const navigate = useNavigate();
  const location = useLocation();

  const { authontroller } = useContext(ControllersContext);
  const { authStore } = useContext(StoresContext);

  useEffect(() => {
    authontroller.initAuth();

    const isAuth = authStore.getAuthenticated;

    if (!isAuth && location.pathname !== RoutePath.login) {
      navigate(RoutePath.login, { replace: true });
    }
  }, []);

  return (
    <Routes>
      <Route path={RoutePath.home} element={<HomePage />} />
      <Route path={RoutePath.login} element={<LoginPage />} />
      <Route path={RoutePath.repository} element={<RepositoryPage />} />
    </Routes>
  );
});
