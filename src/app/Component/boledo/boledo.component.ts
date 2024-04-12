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
import { boledoDataModel } from '../../DataModels/boledoData.model';
import { BoledoService } from '../../Services/boledo.service';
import { BoledoAddEditDialogComponent } from '../boledo-add-edit-dialog/boledo-add-edit-dialog.component';
import { FormControlName } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-boledo',
  standalone: true,
  templateUrl: './boledo.component.html',
  styleUrl: './boledo.component.css',
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
  ],
})
export class BoledoComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private boledoService: BoledoService,
    private snackBar: MatSnackBar
  ) {}

  displayedColumns: string[] = ['date', 'winningNumber', 'action'];

  dataSource = new MatTableDataSource<boledoDataModel>();

  ngOnInit(): void {
    this.populateTable();
  }
  populateTable() {
    this.boledoService.getAllBoledo('active').subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  dateFilter(dateFilterInput: string) {
    this.boledoService
      .getBoledoByDate(dateFilterInput.toString())
      .subscribe((data) => {
        this.dataSource.data = data;
      });
  }

  Delete(data: Partial<boledoDataModel>) {
    const id = data.id;

    const newBoledoEntry = { ...data } as Partial<boledoDataModel>;
    newBoledoEntry.status = 'inactive';
    delete newBoledoEntry.id;

    this.boledoService
      .updateBoledoEntry(id!, newBoledoEntry)
      .subscribe((val) => {
        if (val === undefined) {
          this.refreshTable(true);
          this.openSnackBar('Entry removed successfully.', 'success-snackBar');
        } else {
          this.openSnackBar('Entry was not Removed!', 'error-snakcBar');
        }
      });
  }
  refreshTable(event: boolean) {
    if (event) {
      this.populateTable();
    }
  }
  openSnackBar(message: string, cssStyle: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
      panelClass: [cssStyle],
    });
  }
  Edit(data: Partial<boledoDataModel>) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = data;

    this.dialog
      .open(BoledoAddEditDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe((val) => {
        if (val == undefined) {
          this.refreshTable(true);
          this.openSnackBar('Updated successfully!', 'success-snackBar');
        } else {
          this.openSnackBar('Update fail!', 'error-snackBar');
        }
      });
  }

  Add() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = '';
    dialogConfig.width;

    this.dialog
      .open(BoledoAddEditDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe((val) => {
        if (val) {
          this.refreshTable(true);
          this.openSnackBar('New Boledo Entry Was Added!', 'success-snackBar');
        } else {
          this.openSnackBar('New Boledo was not Added!', 'error-snackBar');
        }
      });
  }
}
