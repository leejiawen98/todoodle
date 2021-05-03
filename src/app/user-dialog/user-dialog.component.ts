import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {

  user: string;

  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
      dialogRef.disableClose = true;
      this.user = '';
    }

  onNoClick(): void {
    if (this.user != '')
      this.dialogRef.close();
  }

  ngOnInit()
  {

  }
}
