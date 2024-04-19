import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class JsonDataService {
  constructor(private http: HttpClient) {}

  public hideLogoutBtn: boolean = false;

  getJsondata(schId: any) {
    return this.http.get<any>(
      `https://unattendedops.cambro.com/api/LabelData/GetLabelData/${schId}`
    );
  }
}
