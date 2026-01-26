import { environment } from "environments/environment";

export const SessionController = {
  get CreateSession() {
    const baseUrl = environment.Config?.crescentUrls?.baseUrl;
    return `${baseUrl}/api/sessions/create-session`;
  },
  get GetSessions() {
    const baseUrl = environment.Config?.crescentUrls?.baseUrl;
    return `${baseUrl}/api/sessions/current-month`;
  },
};
