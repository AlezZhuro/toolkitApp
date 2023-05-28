import { createContext, Context } from "react";

import {
  AuthController,
  AuthControllerType,
  RepositoriesController,
  RepositoriesControllerType,
} from "@/controllers";

import AuthAPI from "@/services/auth";

import { API_BASE_URL, AUTH_BASE_URL } from "@/constants";
import { AuthenticateDTO, storage } from "@/services";
import { ClientError, GraphQLClient } from "graphql-request";
import { RootStore } from "@/store/Root";

import {
  ResponseErrorType,
  RoutePath,
  StorageKey,
  StorageType,
} from "./models";

export interface IControllersContextValue {
  authontroller: AuthControllerType;
  reposController: RepositoriesControllerType;
}

let store: RootStore;

const StoresContext = createContext<RootStore | null>(
  null
) as Context<RootStore>;

const ControllersContext = createContext<IControllersContextValue | null>(
  null
) as Context<IControllersContextValue>;

export { ControllersContext, StoresContext };

export function initContextsValues() {
  const stores: RootStore = store ?? new RootStore();

  const controllers: IControllersContextValue = {
    authontroller: new AuthController(
      stores.authStore,
      new AuthAPI(AUTH_BASE_URL),
      storage
    ),
    reposController: new RepositoriesController(
      stores.repositories,
      new GraphQLClient(API_BASE_URL, {
        requestMiddleware: (request) => {
          const auth = storage.get<AuthenticateDTO | null>(
            StorageType.Local,
            StorageKey.AuthData,
            null
          );

          return {
            ...request,
            headers: {
              ...request.headers,
              authorization: `${auth?.token_type} ${auth?.access_token}`,
            },
          };
        },
        responseMiddleware: (response) => {
          if (response instanceof ClientError) {
            if (
              response.response.status === 401 &&
              response.response.message === ResponseErrorType.BadCredentials
            ) {
              controllers.authontroller.logout();
              window.location.href = RoutePath.login;
            }
          }

          return response;
        },
      })
    ),
  };

  return {
    stores,
    controllers,
  };
}
