import {Component, Inject, OnInit} from '@angular/core';
import {DatafetchService} from "../../services/datafetch.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {formatDate} from "@angular/common";
import {CommonServiceService} from "../../services/common-service.service";

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrl: './add-transaction.component.css'
})
export class AddTransactionComponent implements OnInit{
  tran:any;
  minDate: any;
  currency_list=[];
  is_Valid = false;
  constructor(public dialogRef: MatDialogRef<AddTransactionComponent>,  @Inject(MAT_DIALOG_DATA) public data: any, private commonService: CommonServiceService, private datafetchsvc: DatafetchService){}

  ngOnInit() {
    this.tran = this.data.tran;
    this.datafetchsvc.getCurrencies().subscribe(data=> {
      this.currency_list = data.currency
    });
  }


  formatDate(selectedDate: Date): void {
    this.commonService.formatdate(selectedDate);
  }
  closeDialog(): void{
    this.dialogRef.close()
  }
  onNoClick(): void {
    this.dialogRef.close(this.tran);
  }

  formValidation(): void{
    if(this.tran['transaction_type'] && this.tran['transaction_date'] && this.tran['amount'] && this.tran['currency']){
      this.is_Valid = true;
    }
  }
}
