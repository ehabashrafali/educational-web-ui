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
    return `${baseUrl}/api/sessions/get-sessions-by-user-id`;
  },
  get getSessionById() {
    const baseUrl = environment.Config?.crescentUrls?.baseUrl;
    return `${baseUrl}/api/sessions/get-session-by-id`;
  },
  get Update() {
    const baseUrl = environment.Config?.crescentUrls?.baseUrl;
    return `${baseUrl}/api/sessions/update-session`;
  },
};
