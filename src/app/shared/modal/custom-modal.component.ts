import { Component, Input, OnInit, Type } from "@angular/core";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { scheduled } from "rxjs";

@Component({
  selector: "custom-modal",
  templateUrl: "./custom-modal.component.html",
  styleUrls: ["./custom-modal.component.scss"],
})
export class CustomModal implements OnInit {
  inputScheduleId: string = "";
  dropDownScheduleId: string = "";
  dropdown: boolean = false;
  @Input() data: any;
  constructor(public modal: NgbActiveModal) {}

  ngOnInit(): void {}

  onSelectDropdownValue(option: any) {
    this.dropDownScheduleId = option.name;
    this.dropdown = true;
  }

  closeModal() {
    this.modal.close({ scheduleId: this.inputScheduleId });
    return scheduled;
  }
}

export const CUSTOM_MODALS: { [name: string]: Type<any> } = {
  customModal: CustomModal,
};
