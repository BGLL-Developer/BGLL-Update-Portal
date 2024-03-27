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
import { AddEditDialogComponent } from '../add-edit-dialog/add-edit-dialog.component';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
} from '@angular/material/dialog';


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
    AddEditDialogComponent,
    MatDialogModule,
    MatMenuModule,
  ],
})
export class BoledoComponent {
  Delete() {
    throw new Error('Method not implemented.');
  }
  Edit() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = this.dataSource;
    
    this.dialog.open(AddEditDialogComponent, dialogConfig);
  }
  constructor(private dialog: MatDialog) {}

  Add() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = 'auto';
    dialogConfig.minHeight = 'auto';

    this.dialog.open(AddEditDialogComponent, dialogConfig);
  }

  @Input() displayedColumns: string[] = ['date', 'number', 'action'];
  dataSource = [
    { date: '2024-03-01', number: '12345' },
    { date: '2024-03-02', number: '54321' },
  ];
}
