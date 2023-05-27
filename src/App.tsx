import { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  ControllersContext,
  StoresContext,
  initContextsValues,
} from "./context";
import { HomePage, LoginPage } from "./pages";
import { RoutePath } from "@/models";
import "./App.css";

export const App = () => {
  const contexts = initContextsValues();

  return (
    <StoresContext.Provider value={contexts.stores}>
      <ControllersContext.Provider value={contexts.controllers}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </ControllersContext.Provider>
    </StoresContext.Provider>
  );
};

const AppRouter = observer(() => {
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
    </Routes>
  );
});
