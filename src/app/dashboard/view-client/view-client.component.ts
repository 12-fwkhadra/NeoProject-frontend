import {Component, Inject, OnInit} from '@angular/core';
import {DatafetchService} from "../../services/datafetch.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CommonServiceService} from "../../services/common-service.service";
import { MatDialogModule } from '@angular/material/dialog';
import {AddTransactionComponent} from "../add-transaction/add-transaction.component";
import {MessageService} from "primeng/api";
import {DatasendService} from "../../services/datasend.service";

@Component({
  selector: 'app-view-client',
  templateUrl: './view-client.component.html',
  styleUrl: './view-client.component.css'
})
export class ViewClientComponent implements OnInit{
  trans = [];
  client :any;
  height:any;
  isSending =false;
  resizeListener: () => void;
  listLength = 0;
  pageSize = 100;
  pageIndex = 0;
  pageSizeOptions: number[] = [100, 500, 700, 1000];
  dateRangeString: string | null = null;
  value2: string='';
  dateRange: Date[]=[];
  stateOptions2: any[] = [
    { label: 'sélectionner la date de début', value: 'start' },
    { label: 'sélectionner la date de fin', value: 'end' }];
  constructor(public dialog: MatDialog, private datafetchsvc: DatafetchService, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ViewClientComponent>, private commonService: CommonServiceService, private messageService: MessageService, private datasendsvc: DatasendService){
    this.height = this.commonService.calculateScrollHeight();
    this.resizeListener = this.commonService.addResizeListener((height: string) => {
          this.height = height;
    });
  }

  ngOnInit() {
    this.client = this.data;
    this.getTrans();
  }

  getTrans(): void {
    this.datafetchsvc.getClientTransactions(this.client.id, this.dateRangeString).subscribe(
      data => {
        this.trans = data.trans; this.listLength = data.total;
      });
  }

  addTrans(): void{
    let dialogRef = this.dialog.open(AddTransactionComponent, {
      height: '500px',
      width: '500px',
      disableClose: true,
      data: {tran:{'client_id':this.client.id}}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.isSending = true;
      if (result) {
        console.log("hello")
        this.datasendsvc.addTransaction(result).subscribe(res => {
          this.messageService.add({severity:res['class'], detail: res['message']});
          this.dateRangeString = null;
          this.getTrans();
          this.isSending = false;
        }, error => {
          this.messageService.add({severity:'error', detail: 'An error has occurred, please contact support'});
          this.isSending = false;
          dialogRef.close();
        });
      }
      else{
        this.isSending = false;
      }
    });
  }
  datevalue(dateRange: Date[]): void {
    if (dateRange[1] === null) {
      // Update the label and value of the start date option
      this.stateOptions2[0].label = 'from: ' + this.formatdate(dateRange[0]);
      this.stateOptions2[0].value = this.formatdate(dateRange[0]);

      // Select the start date option
      this.value2 = this.stateOptions2[0].value;
    } else if (dateRange.length === 2) {
      // Update the label and value of the end date option
      this.stateOptions2[1].label = 'to: ' + this.formatdate(dateRange[1]);
      this.stateOptions2[1].value = this.formatdate(dateRange[1]);

      // Select the end date option
      this.value2 = this.stateOptions2[1].value;
    }
    const formattedDates = dateRange.map(date => {
      return this.formatDateForSending(date);
    });
      this.dateRangeString = `{${formattedDates.join(',')}}`;
      this.getTrans();
  }
  formatDateForSending(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${day}/${month}/${year}`; // French format with '00:00:00' time part
  }

  formatdate(date: any): string {
    return this.commonService.formatdate(date);
  }

  closeDialog(): void{
    this.dialogRef.close()
  }

  pageRel(): void {
    this.dateRangeString = null;
    this.getTrans();
  }

  getServerData(event: any) {
    this.pageSize = event.rows || 100;
    this.pageIndex = event.first / this.pageSize;
    // this.isSending = true;
    this.getTrans();
  }
}
