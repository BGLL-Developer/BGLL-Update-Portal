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
import { AEDialogComponent } from '../aedialog/aedialog.component';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
} from '@angular/material/dialog';

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
    AEDialogComponent,
    MatDialogConfig,
    MatDialogModule,
  ],
})
export class BoledoComponent {
  constructor(private dialog: MatDialog) {}

  deleteEntry() {
    throw new Error('Method not implemented.');
  }
  editEntry() {
    throw new Error('Method not implemented.');
  }

  AddEntry() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '400px';

    dialogConfig.data = ELEMENT_DATA;

    this.dialog.open(AEDialogComponent, dialogConfig);
  }

  displayedColumns: string[] = ['date', 'WinNum'];
  dataSource = ELEMENT_DATA;
}
