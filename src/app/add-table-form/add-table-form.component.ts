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
import { NgbDropdownConfig } from "@ng-bootstrap/ng-bootstrap";
import { HttpProviderService } from "../service/http-provider.service";
let _this: AddTableFormComponent;
@Component({
  selector: "app-add-table-form",
  templateUrl: "./add-table-form.component.html",
  styleUrls: ["./add-table-form.component.scss"],
})
export class AddTableFormComponent implements OnInit {
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
    private router: Router
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
  addNewField() {
    const control = this.fb.group({
      name: ["", Validators.required],
      dataType: ["", Validators.required],
      length: ["", Validators.required],
      primarykey: ["", Validators.required],
    });
    (this.tableForm.get("columns") as FormArray).push(control);
  }
  removeField(index: number) {
    (this.tableForm.get("columns") as FormArray).removeAt(index);
  }
  // submitForm() {
  //   console.log(this.tableForm.value)
  // }

  submitForm() {
    this.formData = this.tableForm.value;
    this.databaseName = this.route.snapshot.queryParams["databaseName"];
    this.httpProviderService
      .createTable(this.databaseName, this.formData)
      .subscribe(
        (response) => {
          console.log(response);
          this.toastr.success(`${Object.values(response)[1]}`);
          this.router.navigate(["view-database"], {
            queryParams: { database: this.databaseName },
          });
        },
        (error) => {
          console.error(error);
        }
      );
  }
}
export class createTableForm {
  tableName: string = "";
}
