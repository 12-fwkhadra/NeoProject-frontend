import { Component } from '@angular/core';
import {DatafetchService} from "../services/datafetch.service";
import {CommonServiceService} from "../services/common-service.service";
import {MatDialog} from "@angular/material/dialog";
import {MessageService} from "primeng/api";
import {delay} from "rxjs";
import {ViewClientComponent} from "./view-client/view-client.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  clients=[];
  countries_list=[];
  filter: any = {};
  height:any;
  resizeListener: () => void;
  listLength = 0;
  pageSize = 100;
  pageIndex = 0;
  pageSizeOptions: number[] = [100, 500, 700, 1000];
  isSending=false;
  private FileSaver: any;
  constructor(private datafetchsvc: DatafetchService, private commonService: CommonServiceService, public dialog: MatDialog, private messageService: MessageService){
        this.height = this.commonService.calculateScrollHeight();
        this.resizeListener = this.commonService.addResizeListener((height: string) => {
          this.height = height;
    });
  }

  ngOnInit(): void {
    this.getClients();
    this.datafetchsvc.getCountries().subscribe(data=> this.countries_list = data.countries);
    this.resizeListener = this.commonService.addResizeListener((height: string) => {
      this.height = height;
    });
  }

  getClients(): void {
    this.datafetchsvc.getAllClients(this.filter, this.pageIndex + 1, this.pageSize).subscribe(
      data => { this.clients = data.clients; this.listLength = data.total;});
  }

  viewTrans(data:any): void{
    let dialogRef = this.dialog.open(ViewClientComponent, {
      height: '600px',
      width: '900px',
      data: { client: data}
    });
  }

  expClients(): void {
    this.isSending=true;
    this.datafetchsvc.exportClients(this.filter).pipe(
      delay(1500)
    ).subscribe(file => {
      this.FileSaver.saveAs(file, `export all clients.xlsx`);
      this.isSending=false;
    }, err => {
      this.messageService.add({severity:'error', detail: 'An error occured, please contact support'});
      this.isSending=false;
    });
  }

  formatdate(date: any): string {
    return this.commonService.formatdate(date);
  }
  filterCallback(type:any, id:any) {
    this.filter[type] = id
    this.applyFilter();
  }

  applyFilter(): void {
    this.pageIndex = 0;
    this.getClients();
  }

  pageRel(): void {
    this.filter = {};
    this.applyFilter()
  }

  getServerData(event: any) {
    this.pageSize = event.rows || 100;
    this.pageIndex = event.first / this.pageSize;
    console.log(this.listLength)
    // this.isSending = true;
    this.getClients();
  }
}
