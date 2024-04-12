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
import {
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
} from '@angular/material/dialog';
import { JackpotAddEditDialogComponent } from '../jackpot-add-edit-dialog/jackpot-add-edit-dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { jackpotDataModel } from '../../DataModels/jackpotData.model';
import { JackpotService } from '../../Services/jackpot.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-jackpot',
  standalone: true,
  templateUrl: './jackpot.component.html',
  styleUrl: './jackpot.component.css',
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
    MatSelectModule,
  ],
})
export class JackpotComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private jackpotService: JackpotService,
    private snackBar: MatSnackBar
  ) {}

  @Input() displayedColumns: string[] = [
    'date',
    'number1',
    'number2',
    'number3',
    'action',
  ];
  dataSource = new MatTableDataSource<jackpotDataModel>();

  @ViewChild('matSortLottery') SortLottery!: MatSort;

  ngOnInit(): void {
    this.populateTable();
  }

  populateTable() {
    this.jackpotService.getAllJackpots('active').subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  Delete(data: Partial<jackpotDataModel>) {
    const id = data.id;

    const newJackpot = { ...data } as Partial<jackpotDataModel>;
    newJackpot.status = 'inactive';
    delete newJackpot.id;

    this.jackpotService.updateJackpot(id!, newJackpot).subscribe((val) => {
      if (val === undefined) {
        this.refreshTable(true);
        this.openSnackBar('Jackpot removed successfully!', 'success-snackBar');
      } else {
        this.openSnackBar('Jackpot removal unsuccessful!', 'error-snakcBar');
      }
    });
  }

  Edit(data: Partial<jackpotDataModel>) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = data;

    this.dialog
      .open(JackpotAddEditDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe((val) => {
        if (val == undefined) {
          this.refreshTable(true);
          this.openSnackBar(
            'Jackpot updated successfully!',
            'success-snackBar'
          );
        } else {
          this.openSnackBar('Jackpot Update Failed!', 'error-snackBar');
        }
      });
  }

  Add() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = '';

    this.dialog
      .open(JackpotAddEditDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe((val) => {
        if (val) {
          this.refreshTable(true);
          this.openSnackBar('Jackpot added successfully!', 'success-snackBar');
        } else {
          this.openSnackBar('Failed to add Jackpot!', 'error-snackBar');
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
    this.jackpotService
      .getJackpotByDate(dateFilterInput.toString())
      .subscribe((data) => {
        this.dataSource.data = data;
      });
  }
}
