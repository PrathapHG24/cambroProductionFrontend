import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../service/http-provider.service';
import { FormValidationMessages } from '../common.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  addUserForm: userFormModel = new userFormModel();

  @ViewChild("userForm")
  userForm!: NgForm;

  isSubmitted: boolean = false;

  constructor(private router: Router, private httpProvider: HttpProviderService, private toastr: ToastrService) { }
  public formValidationMessages: any = FormValidationMessages
  ngOnInit(): void {
  }

  onAddUser(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      console.log("User Name is:",this.addUserForm);
      this.httpProvider.addUser(this.addUserForm).subscribe(res => {
          this.toastr.clear();
          this.toastr.success('User created Successfully', '', { timeOut: 2500 })
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 500);
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

export class userFormModel {
  userName: string = "";
  password: string = "";
}
// ^ [a - zA - Z_][a - zA - Z0 -9_] * $