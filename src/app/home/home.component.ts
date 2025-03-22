import { Component, Input, OnInit, Type } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { HttpProviderService } from "../service/http-provider.service";
import { WebApiService } from "../service/web-api.service";
import { LoginService } from "../service/login.service";
import { CUSTOM_MODALS } from "../shared/modal/custom-modal.component";
import { HttpClient } from "@angular/common/http";
import { JsonDataService } from "src/json-data.service";
import { Action } from "rxjs/internal/scheduler/Action";

@Component({
  selector: "ng-modal-confirm",
  template: `
    <div class="modal-header">
      <h5 class="modal-title" id="modal-title">Delete Confirmation</h5>
      <button
        type="button"
        class="btn close"
        aria-label="Close button"
        aria-describedby="modal-title"
        (click)="modal.dismiss('Cross click')"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Are you sure you want to delete?</p>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-secondary"
        (click)="modal.dismiss('cancel click')"
      >
        CANCEL
      </button>
      <button
        type="button"
        ngbAutofocus
        class="btn btn-success"
        (click)="modal.close('Ok click')"
      >
        OK
      </button>
    </div>
  `,
})
export class NgModalConfirm {
  constructor(public modal: NgbActiveModal) {}
}

@Component({
  selector: "ng-modal-confirm-close-batch",
  template: `
    <div class="modal-header">
      <h5 class="modal-title" id="modal-title">Close Batch Confirmation</h5>
      <button
        type="button"
        class="btn close"
        aria-label="Close button"
        aria-describedby="modal-title"
        (click)="modal.dismiss('Cross click')"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Are you sure you want to close the batch?</p>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-secondary"
        (click)="modal.dismiss('cancel click')"
      >
        CANCEL
      </button>
      <button
        type="button"
        ngbAutofocus
        class="btn btn-success"
        (click)="modal.close('Ok click')"
      >
        OK
      </button>
    </div>
  `,
})
export class NgModalConfirmCloseBatch {
  constructor(public modal: NgbActiveModal) {}
}

export const MODALS: { [name: string]: Type<any> } = {
  deleteModal: NgModalConfirm,
  closeBatchModal: NgModalConfirmCloseBatch,
};
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  public showAddBatch: boolean = false;
  public matchedTables: any[] = [];
  interval: any = null;
  jsonData: any = [];
  objectVar: any = {};
  inputScheduleId: string = "";
  closeResult = "";
  savedDataSuccess: any;
  schedulerId = "";
  databaseList: any = [
    {
      id: 1,
      name: "temp db",
    },
    {
      id: 2,
      name: "second db",
    },
  ];
  selectedTable = null;
  insertDataResponse = [];
  schedulerTagsList = [];
  plcTagMapping = {};
  insertingPlcData = false;
  closingBatch = false;
  isBatchOpen: boolean;
  params: any = {};
  constructor(
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private httpProvider: HttpProviderService,
    private webApiService: WebApiService,
    private service: JsonDataService,
    private http: HttpClient,
    private loginService: LoginService,
    private jsonService: JsonDataService,
    private route: ActivatedRoute
  ) {}
  reload() {
    this.getAlldatabase();
  }
  ngOnInit(): void {
    this.params = { scheduleId: this.route.snapshot.queryParams["scheduleId"] };
    this.getAlldatabase();
    this.checkBatchStatus();
    // this.service.getJsondata().subscribe((data) => {
    //   this.jsonData = data;
    //   return this.jsonData;
    // });
  }

  checkBatchStatus() {
    let batchStatus = sessionStorage.getItem("isBatchOpen");
    if (this.params.scheduleId) {
      batchStatus = "true";
      this.showAddBatch = true;
      this.schedulerId = this.params.scheduleId;
      this.getSchedulerData();
    }
    if (batchStatus === "true") {
      this.isBatchOpen = true;
    } else {
      this.isBatchOpen = false;
    }
  }

  async getAlldatabase() {
    this.webApiService.get("api/showdbs").subscribe({
      next: (data) => {
        if (data != null && data.body != null) {
          var resultData = data.body;
          if (resultData) {
            this.databaseList = resultData;
          }
        }
      },
    });
  }
  getSchedulerData() {
    return this.jsonService.getJsondata(this.schedulerId).subscribe((data) => {
      this.importJSONDATA(data[0]);
      this.jsonData = data;
      this.objectVar = this.schedulerId;
      // Now that we have received the data, let's save the schedule ID to the backend
      this.saveScheduleIdToBackend(this.schedulerId);
    });
  }
  saveScheduleIdToBackend(schedulerId: string) {
    this.jsonService.saveSchedulerId(schedulerId).subscribe(
      (response) => {
        console.log('Schedule ID saved successfully:', response);
        // Handle success response here
      },
      (error) => {
        console.error('Error saving Schedule ID:', error);
        // Handle error response here
      }
    );
  }

  getSchedulerDataAndInsert() {
    if (
      !this.selectedTable &&
      this.schedulerId.length === 13 &&
      this.matchedTables.length > 0
    ) {
      this.SaveTable(this.matchedTables[0], 0);
    }
  }

  clearSchedulerId() {
    this.schedulerId = "";
  }

  onCloseBatchConfirmation() {
    this.modalService
      .open(MODALS["closeBatchModal"], {
        ariaLabelledBy: "modal-basic-title",
      })
      .result.then(
        (result) => {
          console.log("Close batch confirmed");
          this.onCloseBatch();
        },
        (reason) => {
          console.log("Close batch cancelled");
        }
      );
  }

  // onCloseBatch() {
  //   this.updateEndTime();
  //   this.isBatchOpen = false; // Update the flag when batch is closed
  //   sessionStorage.setItem("isBatchOpen", "false"); // Store batch status in sessionStorage
  //   window.location.href = "https://cambromachine:4200";
  // }
  onCloseBatch() {
    this.isBatchOpen = false; // Update the flag when batch is closed
    sessionStorage.setItem("isBatchOpen", "false"); // Store batch status in sessionStorage

    const data = [{ CAMBRO_BATCH_START_STOP_M1: "STOP" }]; // Define your data here

    this.closeBatch(data); // Call closeBatch and pass the data
}

closeBatch(data: any) {
    this.closingBatch = true; // Set insertingPlcData to true to show the loader

    this.http.post<any>('http://127.0.0.1:8083/insertDataToPlc', data).subscribe(
        (res: any) => {
            this.closingBatch = false; // Set insertingPlcData to false after successful insertion
            this.updateEndTime(); // Update the end time after successful insertion
            this.toastr.success('Batch closed successfully.');

            // Redirect to another URL after closing the batch    
            window.location.href = "https://cambromachine:4200";
        },
        (error: any) => {
            this.closingBatch = false; // Set insertingPlcData to false in case of error
            this.toastr.error('Failed to close batch.');
            window.location.href = "https://cambromachine:4200";
        }
    );
}
  
  // onCloseBatch() {
  //   this.updateEndTime();
  //   this.isBatchOpen = false; // Update the flag when batch is closed
  //   sessionStorage.setItem("isBatchOpen", "false"); // Store batch status in sessionStorage
  
  //   const data = [{ CAMBRO_BATCH_START_STOP_M1: "STOP" }]; // Define your data here
  
  //   // Call closeBatch and wait for success before redirecting
  //   this.closeBatch(data)
  //     .then(() => {
  //       // Wait for 2 seconds before redirecting
  //       setTimeout(() => {
  //         window.location.href = "https://cambromachine:4200";
  //       }, 2000);
  //     })
  //     .catch(() => {
  //       this.toastr.error('Batch close failed. Redirection stopped.');
  //     });
  // }
  
  // closeBatch(data: any): Promise<void> {
  //   return new Promise((resolve, reject) => {
  //     this.http.post<any>('http://127.0.0.1:8083/insertDataToPlc', data).subscribe(
  //       (res: any) => {
  //         // Check for a successful response based on the server's response structure
  //         if (res && res.message === "Data written successfully.") { // Match the server's success message
  //           this.toastr.success('Batch closed successfully.');
  //           resolve(); // Proceed with redirection
  //         } else {
  //           this.toastr.error('Failed to close batch.');
  //           reject(); // Stop redirection
  //         }
  //       },
  //       (error: any) => {
  //         this.toastr.error('Failed to close batch.');
  //         reject(); // Stop redirection on failure
  //       }
  //     );
  //   });
  // }

  updateEndTime() {
    console.log("updateEndTime", this.selectedTable);
    const queryParams = {
      dbName: this.selectedTable.databaseName,
      tableName: this.selectedTable.tableName,
      schedulerId: this.schedulerId,
    };
    this.httpProvider.updateEndTime(queryParams).subscribe((data) => {
      this.showAddBatch = false;
      this.matchedTables = [];
      this.clearSchedulerId();
      this.selectedTable = null;
    });
  }
  opennConnectModal(table: any) {
    if (this.isBatchOpen || sessionStorage.getItem("isBatchOpen") === "true") {
      // If batch is open, set showAddBatch to true to show the details directly
      this.showAddBatch = true;
      this.isBatchOpen = true;
      sessionStorage.setItem("isBatchOpen", "true"); // Store batch status in sessionStorage
    } else {
      // If batch is not open, open the batch as usual
      this.showAddBatch = true;
      this.isBatchOpen = false;
      sessionStorage.setItem("isBatchOpen", "false"); // Store batch status in sessionStorage
    }
    this.showAddBatch = true;
  }
  SaveTable(table, index) {
    console.log("table", table);
    // table = "label_data2";
    this.matchedTables = this.matchedTables.splice(index, 1);
    // console.log(table);
    this.getScheduleIdData(table);
  }

  getScheduleIdData(table: any) {
    this.selectedTable = table;
    // this.interval = setInterval(() => {
    this.httpProvider.fetchScheduleIdData(this.schedulerId).subscribe(
      (res) => {
        const queryParams = {
          tableName: table.tableName,
          dbName: table.databaseName,
        };
        console.log(res);
        console.log(queryParams);
        const el = document.querySelector("#sceduler");
        el.setAttribute("disabled", "true");
        if (this.params.scheduleId) {
          this.insertDataResponse = res.body[0];
          return;
        }

        this.insertData(res.body, res.body, queryParams);
      },
      (err) => {
        clearInterval(this.interval);
      }
    );
    // }, 2000)
  }

  insertData(obj: any, payload: any, queryParams: any) {
    console.log(obj, payload, queryParams);
    return this.httpProvider.insertData(payload, queryParams).subscribe(
      (res) => {
        if (obj.dropdown) {
          return;
        }
        clearInterval(this.interval);
        // this.httpProvider.saveScheduleId(obj.scheduleId).subscribe((res) => {
        //   console.log(res);
        //   this.toastr.success(`Data inserted successfully`);
        //   // console.log(Object.values(this.savedDataSuccess)[1]);
        // });
        if (res.data) {
          this.insertDataResponse = res.data[0];
        }
        console.log("this.insertDataResponse", this.insertDataResponse);
        this.toastr.success(res.message);
        this.getSchedulerTags();
      },
      (err) => {
        clearInterval(this.interval);
      }
    );
  }

  insertDataInSelectedTable() {
    console.log("this.params.scheduleId");
    console.log("this.params.scheduleId", this.params.scheduleId);
    if (this.params.scheduleId) {
      return;
    }
    if (this.selectedTable) {
      if (this.schedulerId.length === 13) {
        console.log("insnide this");
        this.getScheduleIdData(this.selectedTable);
      }
    }
  }

  isUserAdmin(): boolean {
    // Assuming you have a method in your LoginService to get the user's role
    return this.loginService.getUserRole() === "ADMIN";
  }
  isUser(): boolean {
    // Assuming you have a method in your LoginService to get the user's role
    return this.loginService.getUserRole() === "USER";
  }

  AddDatabase() {
    this.router.navigate(["Adddatabase"]);
  }

  addUser() {
    this.router.navigate(["adduser"]);
  }

  viewuserEvent() {
    this.router.navigate(["viewuserEvent"]);
  }

  userManagement() {
    this.router.navigate(["userManagement"]);
  }

  deletedatabaseConfirmation(database: any) {
    this.modalService
      .open(MODALS["deleteModal"], {
        ariaLabelledBy: "modal-basic-title",
      })
      .result.then(
        (result) => {
          // console.log(database)
          this.deletedatabase(database.name);
        },
        (reason) => {}
      );
  }
  jsonInput: string = ""; // Add this property
  importingInProgress: boolean = false;

  importJSONDATA(data: any) {
    this.importingInProgress = true;

    // have a method like importJsonData in your webApiService
    this.webApiService.importJsonData(data).subscribe(
      (response) => {
        console.log("Import JSON Response:", response);
        this.matchedTables = response.body;
        // this.tableName = response.body.tableName;
        // this.dbName = response.body.databaseName;
        // console.log(this.tableName);
        // Handle the response as needed

        // Assuming the response has tableName and databaseName properties
        if (response.body) {
          //&& response.body.tableName && response.body.databaseName
          console.log(
            `Identified Table: ${response.body
              ?.map((table) => table.tableName)
              .join()} in Database: ${response.databaseName}`
          );
          this.toastr.success(`Database match found`);
        } else {
          console.error("Invalid response format:", response);
          this.toastr.error("Table not found please ask Admin to create.");
        }

        this.importingInProgress = false;
      },
      (error) => {
        console.error("Import JSON Error:", error);
        this.importingInProgress = false;
        if (error.status === 404) {
          this.toastr.error("Table not found please ask Admin to create.");
        } else {
          this.toastr.error("Error during import");
        }
      }
    );
  }

  importJSON() {
    this.importingInProgress = true;

    // have a method like importJsonData in your webApiService
    console.log(this.jsonData);
    this.webApiService.importJsonData(this.jsonInput).subscribe(
      (response) => {
        console.log("Import JSON Response:", response);

        // Handle the response as needed

        // the response has tableName and databaseName properties
        if (response && response.body.tableName && response.body.databaseName) {
          console.log(
            `Identified Table: ${response.body.tableName} in Database: ${response.databaseName}`
          );
          this.toastr.success(
            `Identified Table: ${response.body.tableName} in Database: ${response.body.databaseName}`
          );
        } else {
          console.error("Invalid response format:", response);
          this.toastr.error("Invalid response format");
        }

        this.importingInProgress = false;
      },
      (error) => {
        console.error("Import JSON Error:", error);
        this.toastr.error("Error during import");
        this.importingInProgress = false;
      }
    );
  }

  deletedatabase(database: any) {
    console.log(database);
    this.httpProvider.dropDatabaseByName(database).subscribe(
      (res: any) => {
        this.toastr.success(res.body.data);

        this.getAlldatabase();
      },
      (error: any) => {}
    );
  }

  getSchedulerTags() {
    this.httpProvider.getSchedulerTags().subscribe(
      (res: any) => {
        this.schedulerTagsList = res.body.map((tag) => {
          if (tag.plcTag) {
            tag["editMode"] = false;
          } else {
            tag["editMode"] = true;
          }
          return tag;
        });

        if (this.areTagsNotNull(this.schedulerTagsList)) {
          this.insertDataInPlc();
        }
      },
      (error: any) => {}
    );
  }

  updateSchedulerTags() {
    const payload = {};
    this.schedulerTagsList.forEach((item) => {
      payload[item.jsonVariable] = item.plcTag;
    });
    console.log("updateSchedulerTags", payload);
    this.httpProvider.updateTag([payload]).subscribe(
      (res: any) => {
        this.toastr.success(res.data);
        this.getSchedulerTags();
      },
      (error: any) => {}
    );
  }

  areTagsNotNull(tagsList: any[]) {
    for (let item of tagsList) {
      if (item["editMode"]) {
        return false; // If any value is null, return false
      }
    }
    return true; // All values are not null
  }


// insertDataInPlc() {
//   this.insertingPlcData = true;
//   this.schedulerTagsList.forEach((item) => {
//     this.plcTagMapping[item.jsonVariable] = item.plcTag;
//   });
//   const payload = {};
//   Object.keys(this.insertDataResponse).map((key) => {
//     payload[this.plcTagMapping[key]] = this.insertDataResponse[key];
//   });
//   this.httpProvider.insertDataToPlc([payload]).subscribe(
//     (res: any) => {
//       this.insertingPlcData = false;
//       // this.toastr.success('Data inserted to Plc');
//       this.toastr.success(res.message);
      
//       // Call the startBatch method after successful data insertion
//       this.startBatch();
//     },
//     (error: any) => {
//       this.insertingPlcData = false;
//       this.toastr.error('Failed to insert data to PLC.');
//     }
//   );
// }

// startBatch() {
//   const data = [{CAMBRO_BATCH_START_STOP_M1 : "START"}]; // Define your data here

//   this.http.post<any>('http://127.0.0.1:8083/insertDataToPlc', data).subscribe(
//     (res: any) => {
//       this.toastr.success('Batch started successfully.');
//     },
//     (error: any) => {
//       this.toastr.error('Failed to start batch.');
//     }
//   );
// }

insertDataInPlc() {
  this.insertingPlcData = true;
  this.schedulerTagsList.forEach((item) => {
    this.plcTagMapping[item.jsonVariable] = item.plcTag;
  });

  // Create the payload object
  const payload = {};
  Object.keys(this.insertDataResponse).map((key) => {
    payload[this.plcTagMapping[key]] = this.insertDataResponse[key];
  });

  // Remove the undefined field from the payload
  if (payload.hasOwnProperty('undefined')) {
  delete payload['undefined'];
  }

  // Add the batch start command to the payload
  payload['CAMBRO_BATCH_START_STOP_M1'] = "START";

  // Send the payload to the PLC
  this.httpProvider.insertDataToPlc([payload]).subscribe(
    (res: any) => {
      this.insertingPlcData = false;
      this.toastr.success(res.message);
      
      // Call the startBatch method after successful data insertion
      this.startBatch();
    },
    (error: any) => {
      this.insertingPlcData = false;
      this.toastr.error('Failed to insert data to PLC.');
    }
  );
}

startBatch() {
  // This method is now redundant since the batch start command is included in the payload
  // You can remove this method or keep it for other purposes
  this.toastr.success('Batch started successfully.');
}
}
