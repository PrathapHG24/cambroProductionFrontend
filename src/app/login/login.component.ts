import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { LoginService } from "src/app/service/login.service";
import { JsonDataService } from "src/json-data.service";

import Swal from "sweetalert2";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginData = {
    username: "",
    password: "",
  };
  scheduleId = null;
  constructor(
    private snack: MatSnackBar,
    private login: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private jsonService: JsonDataService
  ) {}

  ngOnInit(): void {
    this.scheduleId = this.route.snapshot.queryParams["scheduleId"];
  }
  formsubmit() {
    if (
      this.loginData.username == null ||
      this.loginData.username.trim() == ""
    ) {
      this.snack.open("Username Required", "", { duration: 3000 });
      return;
    }

    if (
      this.loginData.password == null ||
      this.loginData.password.trim() == ""
    ) {
      this.snack.open("Password Required", "", { duration: 3000 });
      return;
    }

    this.login.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log("Success");
        console.log(data);
        this.login.loginUseer(data.token);

        this.login.getCurrentUser().subscribe(
          (user: any) => {
            this.login.setUser(user);

            if (this.login.getUserRole() == "ADMIN") {
              console.log("Admin");
              this.router.navigate(["/home"]); // Navigate to '/home'
            } else {
              this.jsonService.hideHomeBtn = true;
              console.log("User");
              if (this.scheduleId) {
                this.router.navigate(["/home"], {
                  queryParams: { scheduleId: this.scheduleId },
                });
                return;
              }
              this.router.navigate(["/home"]); // Navigate to '/home'
            }
          },
          (error) => {
            this.snack.open("Invalid Details", "", { duration: 3000 });
            return;
          }
        );
      },
      (error) => {
        console.log("Error");
        console.log(error);
        this.snack.open("Invalid Details", "", { duration: 3000 });
        return;
      }
    );
  }

  focusInput(event: any) {
    event.target.focus(); // Keeps the input field focused on touch
  }
}
