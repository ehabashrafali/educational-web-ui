import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { CreateParentDto, ParentDto } from "app/modules/models/parent.dto";
import { ParentController } from "../controllers/parent.controller";

@Injectable({
  providedIn: "root",
})
export class ParentService {
  private _httpClient = inject(HttpClient);

  getParents() {
    return this._httpClient.get<ParentDto[]>(ParentController.Parents);
  }

  createParent(parent: CreateParentDto) {
    return this._httpClient.post(ParentController.CreateParent, parent);
  }
}
