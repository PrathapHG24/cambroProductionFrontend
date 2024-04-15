import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { NgbDropdownConfig, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { HttpProviderService } from "../service/http-provider.service";
import { CUSTOM_MODALS } from "../shared/modal/custom-modal.component";
// let _this: AddTableFormComponent;
@Component({
  selector: "app-add-auto-table-form",
  templateUrl: "./add-auto-table-form.component.html",
  styleUrls: ["./add-auto-table-form.component.scss"],
})
export class AddAutoTableFormComponent implements OnInit {
  databaseName: any;
  tableForm: FormGroup = new FormGroup({
    tableName: new FormControl(""),
    columns: new FormArray([]),
  });
  isSubmitted: boolean = false;
  dynamicTableCols = (this.tableForm.get("columns") as FormArray).controls;
  formData: any;

  constructor(
    private fb: FormBuilder,
    config: NgbDropdownConfig,
    private toastr: ToastrService,
    private httpProviderService: HttpProviderService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) {
    (this.tableForm.get("columns") as FormArray).controls;
    config.placement = "bottom-right";
    // this.tableForm = this.fb.group({
    //   tablename: this.fb.control(''),
    //   fields: this.fb.array([]) // Initialize empty FormArray for dynamic fields
    // });
  }

  ngOnInit(): void {}
  addNewTable(isValid: boolean) {
    if (isValid) {
      alert("hey!");
    }
  }
  
  // submitForm() {
  //   console.log(this.tableForm.value)
  // }
  opennConnectModal() {
    this.formData = this.tableForm.value;
    const connectModal = this.modalService.open(CUSTOM_MODALS["customModal"], {
      ariaLabelledBy: "modal-basic-title",
    });

    connectModal.componentInstance.data = this.formData;
    this.databaseName = this.route.snapshot.queryParams["databaseName"];
    connectModal.result.then(
      (obj) => {
        this.httpProviderService.fetchScheduleIdData(obj.scheduleId).subscribe(
          (response) => {
            const queryParams = {
              tableName: this.formData.tableName,
              dbName: this.databaseName,
            };
    
            this.httpProviderService.createAutoTable(response.body, queryParams).subscribe({
              next:(value) =>{
                if(value.status === 'success'){
                  this.toastr.success(value.message, '', { timeOut: 2500 });
                }else{
                  this.toastr.error(value.message, '', { timeOut:2500});
                }
              },
              
            })
          },
          (err) => {
            // clearInterval(this.interval);
          }
        );
      },
      (reason) => {}
    );
  }

  submitForm() {
    this.formData = this.tableForm.value;
    this.databaseName = this.route.snapshot.queryParams["databaseName"];
    // this.httpProviderService
    //   .createTable(this.databaseName, this.formData)
    //   .subscribe(
    //     (response) => {
    //       console.log(response);
    //       this.toastr.success(`${Object.values(response)[1]}`);
    //       this.router.navigate(["view-database"], {
    //         queryParams: { database: this.databaseName },
    //       });
    //     },
    //     (error) => {
    //       console.error(error);
    //     }
    //   );
  }
}
export class createTableForm {
  tableName: string = "";
}
