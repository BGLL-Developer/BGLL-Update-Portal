import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

import {
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
} from '@angular/material/dialog';
import { LotteryAddEditDialogComponent } from '../lottery-add-edit-dialog/lottery-add-edit-dialog.component';

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
  ],
})
export class LotteryComponent {
  Delete() {
    throw new Error('Method not implemented.');
  }
  Edit() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = this.dataSource;

    this.dialog.open(LotteryAddEditDialogComponent, dialogConfig);
  }
  constructor(private dialog: MatDialog) {}

  Add() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = 'auto';
    dialogConfig.minHeight = 'auto';

    this.dialog.open(LotteryAddEditDialogComponent, dialogConfig);
  }

  @Input() displayedColumns: string[] = ['date', 'number', 'action'];
  dataSource = [
    { date: '2024-03-01', number: '12345' },
    { date: '2024-03-02', number: '54321' },
  ];
}
