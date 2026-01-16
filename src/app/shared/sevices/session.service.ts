import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { SessionController } from "../controllers/session.controller";
import { SessionDto } from "app/modules/models/session.dto";
import { DateTime } from "luxon";

@Injectable({
  providedIn: "root",
})
export class SessionService {
  private _httpClient = inject(HttpClient);
  constructor() {}
  CreateSession(id: string, sessionDto: SessionDto) {
    const url = SessionController.CreateSession;
    return this._httpClient.post(`${url}/${id}`, sessionDto);
  }
  GetOfCurrentMonthAndYear(id: string, date: string) {
    const url = SessionController.GetSessions;
    return this._httpClient.get<SessionDto[]>(`${url}/${id}`, {
      params: { date: date },
    });
  }
}
