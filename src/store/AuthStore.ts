import { action, makeAutoObservable } from "mobx";
import { AuthenticateDTO } from "@/services";
import { IResponseError, ObjectType } from "@/models";

interface IAuthStore<AuthData extends ObjectType> {
  authenticated?: boolean;
  isLoading?: boolean;
  error?: IResponseError;
  authData: AuthData | NonNullable<unknown>;
}

export default class AuthStore<AuthData extends ObjectType> {
  protected readonly state: IAuthStore<AuthData> = {
    authData: {},
    isLoading: true,
  };

  constructor() {
    makeAutoObservable<AuthStore<AuthData>>(this, {
      setAuthData: action,
      setAuthenticated: action,
      setError: action,
      setLoading: action,
    });
  }

  get getAuthenticated() {
    return this.state.authenticated;
  }

  setAuthenticated(value: boolean) {
    this.state.authenticated = value;
  }

  setLoading(value: boolean) {
    this.state.isLoading = value;
  }

  setError(value: IResponseError) {
    this.state.error = value;
  }

  setAuthData(data: AuthData) {
    this.state.authData = data;
  }
}

export type AuthStoreType = AuthStore<AuthenticateDTO>;
