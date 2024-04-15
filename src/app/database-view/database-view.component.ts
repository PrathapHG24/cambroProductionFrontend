import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpProviderService } from "../service/http-provider.service";
import { WebApiService } from "../service/web-api.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MODALS } from "../home/home.component";
import { CUSTOM_MODALS } from "../shared/modal/custom-modal.component";
import { LoginService } from "../service/login.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-database-view",
  templateUrl: "./database-view.component.html",
  styleUrls: ["./database-view.component.scss"],
})
export class DatabaseViewComponent implements OnInit, OnDestroy {
  databaseName: any;
  databaseDetail: any = [];
  tableList: any[] = [];
  interval: any = null;
  scheduleIdList: any[] = [];

  constructor(
    public webApiService: WebApiService,
    private route: ActivatedRoute,
    private httpProvider: HttpProviderService,
    private modalService: NgbModal,
    private loginService: LoginService,
    private toastr: ToastrService
  ) {}

  reload() {
    this.getdatabaseDetailByName();
  }

  ngOnInit(): void {
    this.databaseName = this.route.snapshot.queryParams["database"];
    this.getdatabaseDetailByName();
    // this.getAllSchedules();
  }

  async getdatabaseDetailByName() {
    this.webApiService
      .get("api/database/" + this.databaseName)
      .subscribe((data) => {
        if (data !== undefined) {
          console.log(this.databaseName);
          console.log(data.body);
        }

        this.tableList = data.body as any[];
      });
  }
  deleteTableConfirmation(table: any) {
    this.modalService
      .open(MODALS["deleteModal"], {
        ariaLabelledBy: "modal-basic-title",
      })
      .result.then(
        (result) => {
          this.deletetable(table);
        },
        (reason) => {}
      );
  }

  deletetable(table: any) {
    console.log(table);
    this.httpProvider
      .dropTableByName({ dbName: this.databaseName, tableName: table.name })
      .subscribe(
        (response: any) => {
          console.log("response", response);
          this.toastr.success(response.body.data)
          this.getdatabaseDetailByName();
        },
        (error: any) => {}
      );
  }

  opennConnectModal(table: any) {
    console.log(table);
    const connectModal = this.modalService.open(CUSTOM_MODALS["customModal"], {
      ariaLabelledBy: "modal-basic-title",
    });

    connectModal.componentInstance.data = this.scheduleIdList;

    connectModal.result.then(
      (obj) => {
        this.connectTable(table, obj);
      },
      (reason) => {}
    );
  }

  isUserAdmin(): boolean {
    // Assuming you have a method in your LoginService to get the user's role
    return this.loginService.getUserRole() === "ADMIN";
  }
  connectTable(table: any, obj: any) {
    // this.interval = setInterval(() => {
    this.httpProvider.fetchScheduleIdData(obj.scheduleId).subscribe(
      (res) => {
        const queryParams = {
          tableName: table.name,
          dbName: this.databaseName,
        };

        this.insertData(obj, res.body, queryParams);
      },
      (err) => {
        clearInterval(this.interval);
      }
    );
    // }, 2000)
  }

  insertData(obj: any, payload: any, queryParams: any) {
    return this.httpProvider.insertData(payload, queryParams).subscribe(
      (res) => {
        if (obj.dropdown) {
          return;
        }
        clearInterval(this.interval);
        // this.httpProvider.saveScheduleId(obj.scheduleId).subscribe((res) => {});
      },
      (err) => {
        clearInterval(this.interval);
      }
    );
  }

  // getAllSchedules() {
  //   this.httpProvider.fetchAllScheduelIds().subscribe((res) => {
  //     console.log(res);
  //     this.scheduleIdList = res.body;
  //   });
  // }

  backupDatabase(table) {
    this.httpProvider.saveDBBackup(table.name).subscribe((res) => {
      this.toastr.success('DB backup sucessfully')
    });
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
