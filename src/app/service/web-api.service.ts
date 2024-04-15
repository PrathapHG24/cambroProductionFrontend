import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { map } from "rxjs/operators";
import { catchError } from "rxjs/internal/operators/catchError";
import { HttpHeaders, HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class WebApiService {
  constructor(private httpClient: HttpClient) {}

  // Get call method
  // Param 1 : authToken
  // Param 2 : url
  getCambroMachineData(url: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      }),
      observe: "response" as "body",
    };

    return this.httpClient.get(url, httpOptions).pipe(
      map((response: any) => this.ReturnResponseData(response)),
      catchError(this.handleError)
    );
  }
  get(url: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      }),
      observe: "response" as "body",
    };

    return this.httpClient.get("https://cambromachine:8080/" + url, httpOptions).pipe(
      map((response: any) => this.ReturnResponseData(response)),
      catchError(this.handleError)
    );
  }

  // Post call method
  // Param 1 : authToken
  // Param 2 : url
  // Param 3 : model
  post(url: string, model: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      // observe: "response" as 'body'
    };

    return this.httpClient.post("https://cambromachine:8080/" + url, model, httpOptions).pipe(
      map((response: any) => this.ReturnResponseData(response)),
      catchError(this.handleError)
    );
  }
  postDataToPlc(url: string, model: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      // observe: "response" as 'body'
    };

    return this.httpClient.post(url, model, httpOptions).pipe(
      map((response: any) => this.ReturnResponseData(response)),
      catchError(this.handleError)
    );
  }

  delete(url: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        // 'Cache-Control' : 'no-cache',
        // 'Pragma' : 'no-cache'
      }),
      observe: "response" as "body",
    };

    return this.httpClient.delete("https://cambromachine:8080" + url, httpOptions).pipe(
      map((response: any) => this.ReturnResponseData(response)),
      catchError(this.handleError)
    );
  }

  importJsonData(jsonInput: any): Observable<any> {
    const url = "https://cambromachine:8080/api/identify";

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      observe: "response" as "body",
    };

    return this.httpClient.post(url, jsonInput, httpOptions).pipe(
      map((response: any) => this.ReturnResponseData(response)),
      catchError(this.handleError)
    );
  }
  private ReturnResponseData(response: any) {
    return response;
  }

  private handleError(error: any) {
    return throwError(error);
  }
}
