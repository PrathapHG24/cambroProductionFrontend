import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { HttpProviderService } from "../service/http-provider.service";
import { WebApiService } from "../service/web-api.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MODALS } from "../home/home.component";
import { HttpClient } from "@angular/common/http";

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
    private httpClient: HttpClient
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

  deleteUserConfirmation(userId: any) {
    this.modalService
      .open(MODALS["deleteModal"], {
        ariaLabelledBy: "modal-basic-title",
      })
      .result.then(
        (result) => {
          this.deleteUser(userId);
        },
        (reason) => {}
      );
  }

  deleteUser(userId: any) {
    // Perform HTTP request to delete user with given userId
    this.httpClient.delete("https://cambromachine:9091/user/" + userId).subscribe(
      (data) => {
        alert("User with ID " + userId + " deleted successfully");
        // Reload table data after deletion
        this.getTableData();
      },
      (error) => {
        console.error("Error deleting user:", error);
        alert("Error deleting user. Please try again later.");
      }
    );
  }

  goBack() {
    this.location.back();
  }
}
