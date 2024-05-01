import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

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
import { MatSort, MatSortModule } from '@angular/material/sort';
import { RouterOutlet, RouterLink } from '@angular/router';
import { GlobalService } from '../../Services/global.service';

@Component({
  selector: 'app-jackpot',
  standalone: true,
  templateUrl: './jackpot.component.html',
  styleUrl: './jackpot.component.css',
  providers: [provideNativeDateAdapter()],
  imports: [
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
    MatSortModule,
    RouterOutlet,
    RouterLink,
    MatPaginatorModule
  ],
})
export class JackpotComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private jackpotService: JackpotService,
    private snackBar: MatSnackBar,
    private globalService: GlobalService
  ) { }

  @Input() displayedColumns: string[] = [
    'date',
    'number1',
    'number2',
    'number3',
    'action',
  ]; // Columns to be displayed in the table
  dataSource = new MatTableDataSource<any>(); // DataSource for MatTable
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngOnInit(): void {
    this.populateTable(); // Populate the table with jackpot data
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Populate the table with jackpot data
  populateTable() {
    this.jackpotService.getAllJackpots('active').subscribe((data) => {
      // Loop through the data and convert date strings to Date objects
      const formattedData = data.map((item) => {
        return {
          ...item,
          date: new Date(item.date),
        };
      });
      this.dataSource.data = formattedData;
    });
  }

  // Delete a jackpot
  deleteJackpot(data: Partial<jackpotDataModel>) {
    const id = data.id;

    const updateJackpotEntry = {
      ...data,
      status: 'inactive',
    } as Partial<jackpotDataModel>;
    updateJackpotEntry.editedBy = this.globalService.username!;
    delete updateJackpotEntry.id;

    this.jackpotService.updateJackpot(id!, updateJackpotEntry).subscribe((val) => {
      if (val === undefined) {
        this.refreshTable(true);
        this.openSnackBar(
          'Winning Number Deleted Successfully!',
          'success-snackBar'
        );
      } else {
        this.openSnackBar('Winning Number was not Deleted!', 'error-snakcBar');
      }
    });
  }

  // Edit a jackpot
  editJackpot(data: Partial<jackpotDataModel>) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = data;

    this.dialog
      .open(JackpotAddEditDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe((val) => {
        if (val) {
          this.refreshTable(true);
          this.openSnackBar(
            'Winning Number Updated Successfully!',
            'success-snackBar'
          );
        } else {
          this.openSnackBar('Winning Number Update Failed!', 'error-snackBar');
        }
      });
  }

  // Add a new jackpot
  addJackpot() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = '';

    this.dialog
      .open(JackpotAddEditDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe((val) => {
        if (val) {
          this.refreshTable(true);
          this.openSnackBar(
            'Winning Number Saved Successfully!',
            'success-snackBar'
          );
        } else {
          this.openSnackBar('Winning Number was not Saved!', 'error-snackBar');
        }
      });
  }

  // Open a snack bar with a message
  openSnackBar(message: string, cssStyle: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
      panelClass: [cssStyle],
    });
  }

  // Refresh the table
  refreshTable(event: boolean) {
    if (event) {
      this.populateTable();
    }
  }

  // Filter jackpots by date
  dateFilter(dateFilterInput: string) {
    this.jackpotService
      .getJackpotByDate(dateFilterInput.toString())
      .subscribe((data) => {
        const formattedData = data.map((item) => {
          return {
            ...item,
            date: new Date(item.date),
          };
        });
        this.dataSource.data = formattedData;
      });
  }
}
