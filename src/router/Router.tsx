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

  const isAuth = authStore.getAuthenticated;

  useEffect(() => {
    authontroller.initAuth();

    if (!isAuth && location.pathname !== RoutePath.login) {
      navigate(RoutePath.login, { replace: true });
    }
  }, [isAuth]);

  return (
    <Routes>
      <Route path={RoutePath.home} element={<HomePage />} />
      <Route path={RoutePath.login} element={<LoginPage />} />
      <Route path={RoutePath.repository} element={<RepositoryPage />} />
    </Routes>
  );
});
