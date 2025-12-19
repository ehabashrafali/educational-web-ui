import { environment } from "environments/environment";

export const AuthController = {
  get login() {
    const baseUrl = environment.Config?.crescentUrls?.baseUrl;
    return `${baseUrl}/api/auth`;
  },
  get SignInWithToken() {
    const baseUrl = environment.Config?.crescentUrls?.baseUrl;
    return `${baseUrl}/api/auth/sign-in-with-token`;
  },
};
