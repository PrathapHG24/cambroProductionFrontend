import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdddatabaseComponent } from "./add-database/add-database.component";
import { EditdatabaseComponent } from "./edit-database/edit-database.component";
import { HomeComponent } from "./home/home.component";
import { DatabaseViewComponent } from "./database-view/database-view.component";
import { TableContentViewComponent } from "./table-content-view/table-content-view.component";
import { AddTableFormComponent } from "./add-table-form/add-table-form.component";
import { LoginComponent } from "./login/login.component";
import { Home2Component } from "./home2/home2.component";
import { SchedulerComponent } from "./scheduler/scheduler.component";
import { AddUserComponent } from "./add-user/add-user.component";
import { AddAutoTableFormComponent } from "./add-auto-table-form/add-auto-table-form.component";

const routes: Routes = [
  // { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: "home", component: HomeComponent },
  { path: "", component: Home2Component },

  {
    path: "view-database",
    component: DatabaseViewComponent,
  },
  {
    path: "view-table",
    component: TableContentViewComponent,
  },
  { path: "add-new-table", component: AddTableFormComponent },
  { path: "add-auto-table", component: AddAutoTableFormComponent },
  { path: "Adddatabase", component: AdddatabaseComponent },
  { path: "adduser", component: AddUserComponent },
  { path: "Editdatabase/:database", component: EditdatabaseComponent },
  { path: "edit-table/:database", component: EditdatabaseComponent },
  { path: "scheduler", component: SchedulerComponent },
  {
    path: "login",
    component: LoginComponent,
  },

  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
