import { Component, Input, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

import {
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
} from '@angular/material/dialog';
import { LotteryAddEditDialogComponent } from '../lottery-add-edit-dialog/lottery-add-edit-dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LotteryService } from '../../Services/lottery.service';
import { lotteryDataModel } from '../../DataModels/lotteryData.model';

@Component({
  selector: 'app-lottery',
  standalone: true,
  templateUrl: './lottery.component.html',
  styleUrl: './lottery.component.css',
  providers: [provideNativeDateAdapter()],
  imports: [
    HeaderComponent,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatTableModule,
    MatDividerModule,
    MatDialogModule,
    MatMenuModule,
    MatSnackBarModule,
  ],
})
export class LotteryComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private lotteryService: LotteryService,
    private snackBar: MatSnackBar
  ) {}

  @Input() displayedColumns: string[] = ['date', 'number', 'action'];
  dataSource = new MatTableDataSource<lotteryDataModel>();

  ngOnInit(): void {
    this.populateTable();
  }

  populateTable() {
    this.lotteryService.getAllLotteries('active').subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  Delete(data: Partial<lotteryDataModel>) {
    const id = data.id;

    const newLottery = { ...data } as Partial<lotteryDataModel>;
    newLottery.status = 'inactive';
    delete newLottery.id;

    this.lotteryService.updateLottery(id!, newLottery).subscribe((val) => {
      if (val === undefined) {
        this.refreshTable(true);
        this.openSnackBar('Lottery removed Successfully!', 'success-snackBar');
      } else {
        this.openSnackBar('Failed to remove Lottery!', 'error-snakcBar');
      }
    });
  }

  Edit(data: Partial<lotteryDataModel>) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = data;

    this.dialog
      .open(LotteryAddEditDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe((val) => {
        if (val == undefined) {
          this.refreshTable(true);
          this.openSnackBar('Updated successfully!', 'success-snackBar');
        } else {
          this.openSnackBar('Failed to update!', 'error-snackBar');
        }
      });
  }

  Add() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = '';
    dialogConfig.width;

    this.dialog
      .open(LotteryAddEditDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe((val) => {
        if (val) {
          this.refreshTable(true);
          this.openSnackBar(
            'New Lottery was Added Successfully!',
            'success-snackBar'
          );
        } else {
          this.openSnackBar('Failed to Add Lottery!', 'error-snackBar');
        }
      });
  }

  openSnackBar(message: string, cssStyle: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
      panelClass: [cssStyle],
    });
  }

  refreshTable(event: boolean) {
    if (event) {
      this.populateTable();
    }
  }

  dateFilter(dateFilterInput: string) {
    this.lotteryService
      .getLotteryByDate(dateFilterInput.toString())
      .subscribe((data) => {
        this.dataSource.data = data;
      });
  }
}
