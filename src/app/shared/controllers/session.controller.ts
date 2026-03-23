import { environment } from "environments/environment";

export const SessionController = {
  get CreateSession() {
    const baseUrl = environment.Config?.crescentUrls?.baseUrl;
    return `${baseUrl}/api/sessions/create-session`;
  },
  get GetSessionsByIdAndDate() {
    const baseUrl = environment.Config?.crescentUrls?.baseUrl;
    return `${baseUrl}/api/sessions`;
  },
  get GetSessions() {
    const baseUrl = environment.Config?.crescentUrls?.baseUrl;
    return `${baseUrl}/api/sessions/search`;
  },
  get delete() {
    const baseUrl = environment.Config?.crescentUrls?.baseUrl;
    return `${baseUrl}/api/sessions/delete-session`;
  },
  get getSessionsByUserId() {
    const baseUrl = environment.Config?.crescentUrls?.baseUrl;
    return `${baseUrl}/api/sessions/get-sessions-by-id`;
  },
};
