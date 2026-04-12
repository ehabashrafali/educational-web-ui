import { SessionDto } from "./session.dto";

export interface GetSessionsResult {
  sessions: SessionDto[];
  totalCount: number;
}
