import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { WebApiService } from './web-api.service';

var apiUrl = '';//"http://:9091";

// var apiUrl = "http://192.168.10.10:105";

var httpLink = {
  getAlldatabase: apiUrl + "/api/database/getAlldatabase",
  dropDatabaseByName: apiUrl + "/api/dropDatabase",
  getdatabaseDetailByName: apiUrl + "/api/database/getdatabaseDetailByName",
  savedatabase: apiUrl + "database/savedatabase",
  adduser: "user/",
  createTable: apiUrl + "api",
  dropTableByName: apiUrl + "/api/dropTable",
  updateTagUrl: apiUrl + 'api/saveJsonKeyAsvalueAndTag',
  insertDataToPlc:"http://127.0.0.1:8083/insertDataToPlc", 
  // insertDataToPlc: apiUrl + '/api/insertDataToPlc'
  logoutRecord:'user-event/logout'
}


// /api/{{selectedDatabas}}/table/create/manoj
@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {

  constructor(private webApiService: WebApiService) { }

  public getAlldatabase(): Observable<any> {
    return this.webApiService.get(httpLink.getAlldatabase);
  }

  public dropDatabaseByName(model: any): Observable<any> {
    return this.webApiService.delete(httpLink.dropDatabaseByName + '/' + String(model));
  }

  public getdatabaseDetailByName(model: any): Observable<any> {
    return this.webApiService.get(httpLink.getdatabaseDetailByName + '?databaseId=' + model);
    // /api/database/getdatabaseDetailByName>databaseId=manoj
  }

  public savedatabase(model: any): Observable<any> {
    return this.webApiService.post(httpLink.savedatabase, model);
  }

  // public addUser(payload: any): Observable<any> {
  //   return this.webApiService.post(httpLink.adduser, payload);
  // }
  public addUser(payload: any): Observable<any[]> {
    const urls = [
      'https://cambromachine:9091/user/',
      'https://cambromachine:9092/user/',
      'https://cambromachine:9093/user/',
      'https://cambromachine:9094/user/'
    ];
  
    const requests = urls.map(url => this.webApiService.addUserPost(url, payload));
  
    // Combine all the observables into one
    return forkJoin(requests);
  }
  
  public dropTableByName(model: { dbName: string; tableName: string }): Observable<any> {
    const url = `${httpLink.dropTableByName}/dbName=${model.dbName}/tableName=${model.tableName}`;
    console.log(url)
    return this.webApiService.delete(url);
  }

  // public createTable(model: any): Observable<any> {
  //   return this.webApiService.post(httpLink.createTable,+'/'+ model);
  // }
  public createTable(databaseName: string, model: any): Observable<any> {
    console.log(databaseName,model)
    const apiUrl = `${httpLink.createTable}/${databaseName}/table/create`;
    return this.webApiService.post(apiUrl, model);
  }

  public fetchScheduleIdData(scheduleId: string) {

    const url = `https://unattendedops.cambro.com/api/LabelData/GetLabelData/${scheduleId}`
    return this.webApiService.getCambroMachineData(url);
  }

  createAutoTable(payload: any, queryParams:any) {
    const url = `mapping/createTable?dbName=${queryParams.dbName}&tableName=${queryParams.tableName}`;
    return this.webApiService.post(url, payload);
  }


  insertData(payload: any, queryParams:any) {
    const url = `mapping/insertData?dbName=${queryParams.dbName}&tableName=${queryParams.tableName}`;
    return this.webApiService.post(url, payload);
  }


  saveScheduleId(scheduleId:any) {
    const url = `mapping/saveSchedulId?scheduleID=${scheduleId}`;
    return this.webApiService.post(url, null);
  }

  // fetchAllScheduelIds() {
  //   const url = `https://cambromachine:9091/mapping/getAllScheduleId`;
  //   return this.webApiService.get(url);
  // }

  saveDBBackup(tableName:string) {
    const url = `api/takebackup/table/${tableName}`;
    return this.webApiService.get(url);
  }

  updateEndTime(queryParams:any) {
    const url = `mapping/updateEndTime?dbName=${queryParams.dbName}&tableName=${queryParams.tableName}&scheduleID=${queryParams.schedulerId}`;
    return this.webApiService.post(url, null);
  }

  getSchedulerTags() {
    return this.webApiService.get(httpLink.updateTagUrl);
  }

  updateTag(payload:any) {
    return this.webApiService.post(httpLink.updateTagUrl, payload);
  }

  insertDataToPlc(payload:any) {
    return this.webApiService.postDataToPlc(httpLink.insertDataToPlc, payload);
  }

  logout(): Observable<any> {
    return this.webApiService.post(httpLink.logoutRecord,{});
  } 
  // /api/{{selectedDatabas}}/table/create/manoj
  
  }

