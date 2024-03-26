import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { AddEditDialogComponent } from '../add.edit.dialog/add.edit.dialog.component';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatMenuModule, MatMenuPanel } from '@angular/material/menu';

/**
 * @title Menu with icons
 */

export interface WinningNumbers {
  date: string; //setting it as string for testing purposes
  WinNum: string;
}

const ELEMENT_DATA: WinningNumbers[] = [
  { date: '03/05/2024', WinNum: '34-21-21' },
  { date: '02/05/2024', WinNum: '34-31-41' },
];

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
  constructor(private dialog: MatDialog,
    private Menu: MatMenuPanel<any>) {}

  deleteEntry() {
    throw new Error('Method not implemented.');
  }
  editEntry() {
    throw new Error('Method not implemented.');
  }

  AddEntry() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = 'auto';

    dialogConfig.data = ELEMENT_DATA;

    this.dialog.open(AddEditDialogComponent, dialogConfig);
  }

  displayedColumns: string[] = ['date', 'WinNum'];
  dataSource = ELEMENT_DATA;
}
