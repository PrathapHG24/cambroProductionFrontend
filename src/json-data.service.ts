import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class JsonDataService {
  constructor(private http: HttpClient) {}
  public hideHomeBtn: boolean = false;


  getJsondata(schId: any) {
    return this.http.get<any>(
      `https://unattendedops.cambro.com/api/LabelData/GetLabelData/${schId}`
    );
  }
  saveSchedulerId(scheduleId: any) {
    return this.http.post<any>(`https://cambromachine:9091/mapping/saveSchedulerId?scheduleID=${scheduleId}`, {});
  }
}
