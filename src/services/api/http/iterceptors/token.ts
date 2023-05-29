import { AxiosInstance, AxiosError, AxiosRequestConfig } from "axios";
import {
  ResponseErrorType,
  RoutePath,
  StorageKey,
  StorageType,
} from "@/models";
import { isIResponseError } from "@/utils";
import { storage, AuthenticateDTO } from "@/services";

export const token = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
    const auth = storage.get<AuthenticateDTO | null>(
      StorageType.Local,
      StorageKey.AuthData,
      null
    );
    if (auth) {
      (
        config.headers as { authorization: string }
      ).authorization = `${auth?.token_type} ${auth.access_token}`;
    }
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      if (
        response.status === 200 &&
        window.location.pathname === RoutePath.login &&
        isIResponseError(response.data) &&
        response.data.error === ResponseErrorType.BadVerificationCode
      ) {
        window.location.href = RoutePath.login;
      }

      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        window.location.href = RoutePath.login;
      }
      return Promise.reject(error.message);
    }
  );
};
