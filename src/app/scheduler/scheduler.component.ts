import { Component, OnInit } from "@angular/core";
import { CUSTOM_MODALS } from "../shared/modal/custom-modal.component";

@Component({
  selector: "app-scheduler",
  templateUrl: "./scheduler.component.html",
  styleUrls: ["./scheduler.component.scss"],
})
export class SchedulerComponent implements OnInit {
  constructor() {
    // const connectModal = this.modalService.open(CUSTOM_MODALS["customModal"], {
    //   ariaLabelledBy: "modal-basic-title",
    // });
    // connectModal.componentInstance.data = this.scheduleIdList;
    // connectModal.result.then(
    //   (obj) => {
    //     this.jsonService
    //       .getJsondata(Object.values(obj)[0])
    //       .subscribe((data) => {
    //         this.importJSONDATA(data[0]);
    //         this.jsonData = data;
    //         this.objectVar = obj;
    //         return this.jsonData;
    //         return this.objectVar;
    //       }),
    //       //   this.connectTable(table, obj);
    //       // console.log(Object.values(obj)[0]);
    //       console.log("OCM running");
    //   },
    //   (reason) => {}
    // );
  }

  ngOnInit(): void {}
}
