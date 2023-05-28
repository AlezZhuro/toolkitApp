import { BrowserRouter } from "react-router-dom";

import {
  ControllersContext,
  StoresContext,
  initContextsValues,
} from "./context";
import "./App.css";
import { AppRouter } from "@/router";

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
