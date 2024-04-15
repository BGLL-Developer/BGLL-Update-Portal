import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
import { MatSort, MatSortModule } from '@angular/material/sort';

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
    MatSortModule,
  ],
})
export class LotteryComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private lotteryService: LotteryService,
    private snackBar: MatSnackBar
  ) {}

  @Input() displayedColumns: string[] = ['date', 'number', 'action']; // Input property for displayed columns
  dataSource = new MatTableDataSource<lotteryDataModel>(); // Data source for MatTable
  @ViewChild(MatSort) sort!: MatSort; // ViewChild for sorting

  ngOnInit(): void {
    this.populateTable(); // Initializing component by populating table data
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort; // Assigning sort to dataSource after view initialization
  }

  populateTable() {
    // Fetching all active lotteries from service and updating dataSource
    this.lotteryService.getAllLotteries('active').subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  Delete(data: Partial<lotteryDataModel>) {
    // Deleting a lottery entry
    const id = data.id;

    const newLottery = { ...data } as Partial<lotteryDataModel>;
    newLottery.status = 'inactive';
    delete newLottery.id;

    this.lotteryService.updateLottery(id!, newLottery).subscribe((val) => {
      if (val === undefined) {
        // Refreshing table and showing success message
        this.refreshTable(true);
        this.openSnackBar(
          'Winning Number Deleted Successfully!',
          'success-snackBar'
        );
      } else {
        // Showing error message
        this.openSnackBar('Winning Number was not Deleted!', 'error-snakcBar');
      }
    });
  }

  Edit(data: Partial<lotteryDataModel>) {
    // Opening dialog for editing a lottery entry
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = data;

    this.dialog
      .open(LotteryAddEditDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe((val) => {
        if (val) {
          // Refreshing table and showing success message
          this.refreshTable(true);
          this.openSnackBar(
            'Winning Number Updated Successfully!',
            'success-snackBar'
          );
        } else {
          // Showing error message
          this.openSnackBar('Winning Number Update Failed!', 'error-snackBar');
        }
      });
  }

  Add() {
    // Opening dialog for adding a new lottery entry
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = '';
    dialogConfig.width;

    this.dialog
      .open(LotteryAddEditDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe((val) => {
        if (val) {
          // Refreshing table and showing success message
          this.refreshTable(true);
          this.openSnackBar(
            'Winning Number Saved Successfully!',
            'success-snackBar'
          );
        } else {
          // Showing error message
          this.openSnackBar('Winning Number was not Saved!', 'error-snackBar');
        }
      });
  }

  openSnackBar(message: string, cssStyle: string) {
    // Opening snackbar with given message and CSS style
    this.snackBar.open(message, '', {
      duration: 2000,
      panelClass: [cssStyle],
    });
  }

  refreshTable(event: boolean) {
    // Refreshing table if event is true
    if (event) {
      this.populateTable();
    }
  }

  dateFilter(dateFilterInput: string) {
    // Filtering lotteries by date
    this.lotteryService
      .getLotteryByDate(dateFilterInput.toString())
      .subscribe((data) => {
        this.dataSource.data = data;
      });
  }
}
