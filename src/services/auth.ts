import { AxiosError, AxiosResponse } from "axios";

import { http } from ".";
import { IResponseError, ObjectType } from "@/models";
import { CLIENT_ID, CLIENT_SECRET } from "@/constants";

export type AuthenticateDTO = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
  token_type: string;
  scope: string;
};

export type ApiServiceResponseType<T> = Promise<AxiosResponse<T>>;

export default class AuthAPI<T extends ObjectType> {
  constructor(private readonly _apiUrl: string) {}

  get apiUrl(): string {
    return this._apiUrl;
  }

  get authorizeLink() {
    return `${this._apiUrl}/authorize?client_id=${CLIENT_ID}`;
  }

  async authenticate(key: string): Promise<IResponseError | T> {
    try {
      const url = import.meta.env.DEV
        ? "/api/access_token"
        : `${this._apiUrl}/api/access_token`;
      const response = await http.get(url, {
        params: {
          code: key,
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
        },
        headers: {
          Accept: "application/json",
        },
      });

      return response.data;
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  protected handleError(e: AxiosError): IResponseError {
    let message = "";
    if (e.response) {
      message = e.message;
    }

    return { isError: true, message };
  }
}

export type AuthApiType = AuthAPI<AuthenticateDTO>;
