import { environment } from "environments/environment";

export const ParentController = {
  get Parents() {
    const baseUrl = environment.Config?.crescentUrls?.baseUrl;
    return `${baseUrl}/api/parents`;
  },
  get CreateParent() {
    const baseUrl = environment.Config?.crescentUrls?.baseUrl;
    return `${baseUrl}/api/parents/create-parent`;
  },
};
