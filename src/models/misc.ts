export enum Language {
  en = "en",
  ru = "ru",
}

export enum RoutePath {
  home = "/",
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
}

// export interface LinkItem {
//   text: string | ReactNode;
//   to?: string;
//   onClick?: () => void;
// }

// export interface LocationState extends Location {
//   state: {
//     routeFrom?: string;
//     routeTo?: string;
//     routeDelta?: number;
//     messageId?: number;
//   };
// }

export type ObjectType = Record<string, unknown> | null | undefined;

export interface IResponseError {
  isError: boolean;
  message: string;
}

export interface IPaginatedProps {
  pageSize: number;
  pageIndex: number;
  totalItems: number;
}

export interface IPaginatedResponse<Type> extends IPaginatedProps {
  items: Type[];
}
