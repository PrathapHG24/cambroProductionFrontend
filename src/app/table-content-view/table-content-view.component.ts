import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpProviderService } from '../service/http-provider.service';
import { WebApiService } from '../service/web-api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MODALS } from '../home/home.component';

@Component({
  selector: 'app-table-content-view',
  templateUrl: './table-content-view.component.html',
  styleUrls: ['./table-content-view.component.scss']
})
export class TableContentViewComponent implements OnInit {

  databaseName: any;
  databaseDetail: any = [];
  selectedTableName:any;
  tableList: any[] = [];
  columnHeaders: any[] = [];
  result: any[] = [];


  constructor(public webApiService: WebApiService, 
    private route: ActivatedRoute, 
    private httpProvider: HttpProviderService, 
    private modalService: NgbModal,
    private location: Location) { }

  reload() {
    this.getTableData();
  }

  ngOnInit(): void {
    this.selectedTableName=this.route.snapshot.queryParams['table']
    this.tableList = this.route.snapshot.queryParams['table'];
    this.databaseName = this.route.snapshot.queryParams['database'];
    this.getTableData();
  }

  async getTableData() {
    this.webApiService.get('api/'+this.databaseName+'/table-data/' +this.tableList).subscribe(data => {
      if (data !== undefined)
      {
        console.log(this.databaseName)
        console.log(data.body)
      }
      this.tableList = data.body as any[];
      console.log(this.tableList[0])
      this.columnHeaders = Object.keys(this.tableList[0]);
    })
  }
  deleteTableConfirmation(tableId: any) {
    this.modalService.open(MODALS['deleteModal'],
      {
        ariaLabelledBy: 'modal-basic-title'
      }).result.then((result) => {
        alert(tableId + ' table deleted')
      },
        (reason) => { });
  }

  goBack() {
    this.location.back();
  }

}

