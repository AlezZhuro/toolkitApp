export enum Language {
  en = "en",
  ru = "ru",
}

export enum RoutePath {
  home = "/home",
  login = "/login",
  repository = "/repository",
}

export enum StorageType {
  Local = "localStorage",
  Session = "sessionStorage",
}

export enum StorageKey {
  AuthData = "authData",
}

export enum ResponseErrorType {
  BadVerificationCode = "bad_verification_code",
  BadCredentials = "Bad credentials",
}

export enum QueryPaginationParameters {
  AFTER = "after",
  BEFORE = "before",
  FIRST = "first",
  LAST = "last",
}
export type ObjectType = Record<string, unknown> | null | undefined;

export interface IResponseError {
  isError: boolean;
  message: string;
}

export interface SerchedRepo {
  id: string;
  name: string;
  url: string;
  description?: string;
  descriptionHTML: any;
  stargazerCount: number;
  languages?: {
    edges?: {
      node: {
        name: string;
      };
    }[];
  };
  owner: {
    avatarUrl: string;
    login: string;
    url: string;
  };
  defaultBranchRef: {
    target: {
      pushedDate: Date;
    };
  };
}
