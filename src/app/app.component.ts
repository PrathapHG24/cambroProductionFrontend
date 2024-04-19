import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "./services/authentication.service";
import { JsonDataService } from "src/json-data.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    public jsondataService: JsonDataService
  ) {}

  HomeClick() {
    this.router.navigate(["Home"]);
  }

  logOut() {
    this.authenticationService.logout();
  }
}