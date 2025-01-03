import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { HttpProviderService } from "../service/http-provider.service";
import { WebApiService } from "../service/web-api.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MODALS } from "../home/home.component";
import { HttpClient } from "@angular/common/http";
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from "rxjs";

@Component({
  selector: "app-user-management",
  templateUrl: "./user-management.component.html",
  styleUrls: ["./user-management.component.scss"],
})
export class UserManagementComponent implements OnInit {
  databaseName: any;
  databaseDetail: any = [];
  selectedTableName: any;
  tableList: any[] = [];
  columnHeaders: any[] = [];
  result: any[] = [];

  constructor(
    public webApiService: WebApiService,
    private route: ActivatedRoute,
    private httpProvider: HttpProviderService,
    private modalService: NgbModal,
    private location: Location,
    private httpClient: HttpClient,
    private toastr: ToastrService,
  ) {}

  reload() {
    this.getTableData();
  }

  ngOnInit(): void {
    this.selectedTableName = this.route.snapshot.queryParams["table"];
    this.tableList = this.route.snapshot.queryParams["table"];
    this.databaseName = this.route.snapshot.queryParams["database"];
    this.getTableData();
  }

  async getTableData() {
    this.webApiService.get("api/mold1/table-data/user").subscribe((data) => {
      if (data !== undefined) {
        console.log(this.databaseName);
        console.log(data.body);
      }
      this.tableList = data.body as any[];
      console.log(this.tableList[0]);
      this.columnHeaders = Object.keys(this.tableList[0]);
    });
  }

  deleteUserConfirmation(user_name: any) {
    if (confirm(`Are you sure you want to delete user with User Name: ${user_name}?`)) {
      this.deleteUser(user_name);
    }
  } 
  deleteUser(user_name: any) {
    const baseUrls = [
      "https://cambromachine:9091/user/",
      "https://cambromachine:9092/user/",
      "https://cambromachine:9093/user/",
      "https://cambromachine:9094/user/",
    ];
  
    // Map each URL to an HTTP DELETE observable
    const deleteRequests = baseUrls.map((baseUrl) =>
      this.httpClient.delete(baseUrl + user_name, { responseType: "text", observe: "response" })
    );
  
    // Use forkJoin to wait for all requests to complete
    forkJoin(deleteRequests).subscribe({
      next: (responses) => {
        responses.forEach((response, index) => {
          if (response.status === 200) {
            this.toastr.success(
              response.body || `User deleted successfully from ${baseUrls[index]}.`,
              "Success",
              {
                timeOut: 3000,
                positionClass: "toast-top-right",
              }
            );
          } else {
            this.toastr.error(
              `Unexpected error from ${baseUrls[index]}. Please try again.`,
              "Error",
              {
                timeOut: 3000,
                positionClass: "toast-top-right",
              }
            );
          }
        });
  
        // Reload table data after all requests succeed
        this.getTableData();
      },
      error: (error) => {
        console.error("Error deleting user:", error);
        this.toastr.error(
          error.error || "Error deleting user from one or more servers. Please try again later.",
          "Error",
          {
            timeOut: 3000,
            positionClass: "toast-top-right",
          }
        );
  
        // Reload table data even if some requests fail
        this.getTableData();
      },
    });
  }
  

    
  goBack() {
    this.location.back();
  }
}
