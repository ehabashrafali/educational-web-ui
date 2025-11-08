import { environment } from "environments/environment";

const BaseUrl = environment.Config.CrescentUrls?.baseUrl + "/auth";

export const AuthController = {
  login: BaseUrl + "/login",
};
