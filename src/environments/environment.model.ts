export interface IEnvironmentModel {
  Config?: IConfigModel;
}

export interface IConfigModel {
  Production?: boolean;
  EnvironmentName?: string;
  crescentUrls?: ICrescentUrls;
  ApiConfig?: IApiConfig;
  ClientConfig?: IClientConfig;
}

export interface IApiConfig {
  BackendApiUrl?: string;
  ApiVersion: 1;
}

export interface IClientConfig {
  ClientId?: string;
  Issuer?: string;
  Scope?: string;
  RedirectUri?: string;
  BaseUrl?: string;
  PostLogoutRedirectUri?: string;
}

export interface ICrescentUrls {
  baseUrl: string;
}
