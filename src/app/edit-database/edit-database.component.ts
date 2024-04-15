import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../service/http-provider.service';
import { FormValidationMessages } from '../common.service';

@Component({
  selector: 'app-edit-database',
  templateUrl: './edit-database.component.html',
  styleUrls: ['./edit-database.component.scss']
})
export class EditdatabaseComponent implements OnInit {
  public formValidationMessages: any = FormValidationMessages
  editdatabaseForm: databaseForm = new databaseForm();

  @ViewChild("databaseForm")
  databaseForm!: NgForm;

  isSubmitted: boolean = false;
  databaseId: any;

  constructor(private toastr: ToastrService, private route: ActivatedRoute, private router: Router,
    private httpProvider: HttpProviderService) { }

  ngOnInit(): void {
    this.databaseId = this.route.snapshot.params['database'];
    this.getdatabaseDetailByName();
  }

  getdatabaseDetailByName() {
    this.httpProvider.getdatabaseDetailByName(this.databaseId).subscribe((data: any) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.editdatabaseForm.Id = resultData.id;
          this.editdatabaseForm.databaseName = resultData.databaseName;
        }
      }
    },
      (error: any) => { });
  }

  Editdatabase(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.toastr.info('Updating database name', '', { timeOut: 2500 });
      this.httpProvider.savedatabase(this.editdatabaseForm).subscribe(async data => {
        if (data != null && data.body != null) {
          var resultData = data.body;
          if (resultData != null && resultData.isSuccess) {
            if (resultData != null && resultData.isSuccess) {
              this.toastr.success(resultData.message);
              setTimeout(() => {
                this.router.navigate(['/Home']);
              }, 500);
            }
          }
        }
      },
        async error => {
          this.toastr.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 500);
        });
    }
  }
}

export class databaseForm {
  Id: number = 0;
  databaseName: string = "";
}
