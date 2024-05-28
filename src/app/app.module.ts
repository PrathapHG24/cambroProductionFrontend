import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { EditdatabaseComponent } from "./edit-database/edit-database.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbDropdownModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { DynamicTableComponent } from "./dynamic-table/dynamic-table.component";
import { DatabaseViewComponent } from "./database-view/database-view.component";
import { TableContentViewComponent } from "./table-content-view/table-content-view.component";
import { AddTableFormComponent } from "./add-table-form/add-table-form.component";
import { ActiveModalComponent } from "./active-modal/active-modal.component";
import { CustomModal } from "./shared/modal/custom-modal.component";
import { LoginComponent } from "./login/login.component";
import { MatBadgeModule } from "@angular/material/badge";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { AuthInterceptorProviders } from "./service/auth.interseptor";
import { Home2Component } from "./home2/home2.component";
import { SchedulerComponent } from "./scheduler/scheduler.component";
import { AddUserComponent } from "./add-user/add-user.component";
import { AddAutoTableFormComponent } from "./add-auto-table-form/add-auto-table-form.component";
import { UserEventComponent } from "./user-event/user-event.component";
import { UserManagementComponent } from "./user-management/user-management.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddUserComponent,
    EditdatabaseComponent,
    DynamicTableComponent,
    DatabaseViewComponent,
    TableContentViewComponent,
    AddTableFormComponent,
    ActiveModalComponent,
    CustomModal,
    LoginComponent,
    Home2Component,
    SchedulerComponent,
    AddAutoTableFormComponent,
    UserEventComponent,
    UserManagementComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgbDropdownModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
  ],
  providers: [AuthInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
