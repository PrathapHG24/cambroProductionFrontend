import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../service/http-provider.service';
import { FormValidationMessages } from '../common.service';

@Component({
  selector: 'app-add-database',
  templateUrl: './add-database.component.html',
  styleUrls: ['./add-database.component.scss']
})
export class AdddatabaseComponent implements OnInit {
  adddatabaseForm: databaseForm = new databaseForm();

  @ViewChild("databaseForm")
  databaseForm!: NgForm;

  isSubmitted: boolean = false;

  constructor(private router: Router, private httpProvider: HttpProviderService, private toastr: ToastrService) { }
  public formValidationMessages: any = FormValidationMessages
  ngOnInit(): void {
  }

  Adddatabase(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      console.log("Database Name is:",this.adddatabaseForm);
     
      this.httpProvider.savedatabase(this.adddatabaseForm).subscribe(res => {
          this.toastr.clear();
          this.toastr.success(res.data, '', { timeOut: 2000 });
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 500)
      },
        error => {
          this.toastr.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 500);
        });
    }
  }

}

export class databaseForm {
  dbName: string = "";
}
// ^ [a - zA - Z_][a - zA - Z0 -9_] * $