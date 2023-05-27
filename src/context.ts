import { createContext, Context } from "react";

import { AuthController } from "@/controllers";

import AuthAPI from "@/services/auth";
import AuthStore, { AuthStoreType } from "./store/AuthStore";
import { AUTH_BASE_URL } from "@/constants";
import { storage } from "@/services";

export interface IStoresContextValue {
  authStore: AuthStoreType;
}

export interface IControllersContextValue {
  authontroller: AuthController;
}

const StoresContext = createContext<IStoresContextValue | null>(
  null
) as Context<IStoresContextValue>;

const ControllersContext = createContext<IControllersContextValue | null>(
  null
) as Context<IControllersContextValue>;

export { ControllersContext, StoresContext };

export function initContextsValues() {
  const stores: IStoresContextValue = {
    authStore: new AuthStore(),
  };

  const controllers: IControllersContextValue = {
    authontroller: new AuthController(
      stores.authStore,
      new AuthAPI(AUTH_BASE_URL),
      storage
    ),
  };

  return {
    stores,
    controllers,
  };
}
