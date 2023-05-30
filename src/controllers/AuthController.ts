import {
  AuthApiType,
  AuthenticateDTO,
  StorageEntityType,
} from "@/services";
import { RoutePath, StorageKey, StorageType } from "@/models";
import { AuthStoreType } from "@/store/AuthStore";
import { isIResponseError } from "@/utils";

export default class AuthController {
  private readonly _authStore: AuthStoreType;
  private readonly _api: AuthApiType;
  private readonly _storage: StorageEntityType;

  constructor(
    authStore: AuthStoreType,
    authAPI: AuthApiType,
    storage: StorageEntityType
  ) {
    this._authStore = authStore;
    this._api = authAPI;
    this._storage = storage;
  }

  get authorizeLink() {
    return this._api.authorizeLink;
  }

  async initAuth() {
    try {
      this._authStore.setLoading(true);

      const authData = this._storage.get<AuthenticateDTO | null>(
        StorageType.Local,
        StorageKey.AuthData,
        null
      );

      if (!authData) {
        throw { message: 401, isError: false };
      }

      this._authStore.setAuthData(authData);

      this._authStore.setAuthenticated(true);
    } catch (error: any) {
      if (!error.isError && error.message === 401) {
        this._authStore.setAuthenticated(false);
      }
    } finally {
      this._authStore.setLoading(false);
    }
  }

  async authenticate(authorizeCode: string) {
    try {
      const response = await this._api.authenticate(authorizeCode);

      if (isIResponseError(response)) {
        throw response;
      }

      this._storage.set(StorageType.Local, StorageKey.AuthData, response);

      this._authStore.setAuthData(response as AuthenticateDTO);
      this._authStore.setAuthenticated(true);
    } catch (error: any) {
      this._authStore.setError(error.message);
    }
  }

  setAuthenticated(isAuth: boolean) {
    this._authStore.setAuthenticated(isAuth);
  }

  logout() {
    this._storage.clear();
    this._authStore.setAuthData({} as AuthenticateDTO);
    this._authStore.setAuthenticated(false);
  }
}

export type AuthControllerType = AuthController