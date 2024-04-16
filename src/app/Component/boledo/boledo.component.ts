import { Component, OnInit, ViewChild } from '@angular/core';
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
import { boledoDataModel } from '../../DataModels/boledoData.model';
import { BoledoService } from '../../Services/boledo.service';
import { BoledoAddEditDialogComponent } from '../boledo-add-edit-dialog/boledo-add-edit-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterOutlet, RouterLink } from '@angular/router';
import { GlobalService } from '../../Services/global.service';

@Component({
  selector: 'app-boledo',
  standalone: true,
  templateUrl: './boledo.component.html',
  styleUrl: './boledo.component.css',
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
    MatSortModule,
    RouterOutlet,
    RouterLink,
  ],
})
export class BoledoComponent implements OnInit {
  // Define displayed columns
  displayedColumns: string[] = ['date', 'winningNumber', 'action'];
  // Define data source for MatTable
  dataSource = new MatTableDataSource<boledoDataModel>();
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private boledoService: BoledoService,
    private snackBar: MatSnackBar,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    // Populate table on component initialization
    this.populateTable();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  // Function to populate the table with data
  populateTable() {
    this.boledoService.getAllBoledo('active').subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  // Function to filter data by date
  dateFilter(dateFilterInput: string) {
    this.boledoService
      .getBoledoByDate(dateFilterInput.toString())
      .subscribe((data) => {
        this.dataSource.data = data;
      });
  }

  // Function to delete data
  deleteBoledo(data: Partial<boledoDataModel>) {
    const id = data.id;

    const updateBoledoEntry = {
      ...data,
      status: 'inactive',
    } as Partial<boledoDataModel>;
    updateBoledoEntry.editedBy = this.globalService.username!;
    delete updateBoledoEntry.id;

    this.boledoService
      .updateBoledoEntry(id!, updateBoledoEntry)
      .subscribe((val) => {
        if (val === undefined) {
          // Refresh table if successful and show success message
          this.refreshTable(true);
          this.openSnackBar(
            'Winning Number Deleted Successfully!',
            'success-snackBar'
          );
        } else {
          // Show error message if deletion failed
          this.openSnackBar(
            'Winning Number was not Deleted!',
            'error-snackBar'
          );
        }
      });
  }

  // Function to refresh table data
  refreshTable(event: boolean) {
    if (event) {
      // Call populateTable() to refresh data
      this.populateTable();
    }
  }

  // Function to display snackbar
  openSnackBar(message: string, cssStyle: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
      panelClass: [cssStyle],
    });
  }

  // Function to edit data
  editBoledo(data: Partial<boledoDataModel>) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = data;

    this.dialog
      .open(BoledoAddEditDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe((val) => {
        if (val) {
          // Refresh table if successful and show success message
          this.refreshTable(true);
          this.openSnackBar(
            'Winning Number Updated Successfully!',
            'success-snackBar'
          );
        } else {
          // Show error message if update failed
          this.openSnackBar('Winning Number Update Failed!', 'error-snackBar');
        }
      });
  }

  // Function to add new data
  addBoledo() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = '';

    this.dialog
      .open(BoledoAddEditDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe((val) => {
        if (val) {
          // Refresh table if successful and show success message
          this.refreshTable(true);
          this.openSnackBar(
            'Winning Number Saved Successfully!',
            'success-snackBar'
          );
        } else {
          // Show error message if save failed
          this.openSnackBar('Winning Number was not Saved!', 'error-snackBar');
        }
      });
  }
}
