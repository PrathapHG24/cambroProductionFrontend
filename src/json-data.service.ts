import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class JsonDataService {
  constructor(private http: HttpClient) {}

  getJsondata(schId: any) {
    return this.http.get<any>(
      `https://unattendedops.cambro.corp/api/LabelData/GetLabelData/${schId}`
    );
  }
}
