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

  constructor(private dialog: MatDialog, private boledoService: BoledoService) {}

  displayedColumns: string[] = [
    'date', 
    'winningNumber',  
    'action'
  ];
  
  dataSource = new MatTableDataSource<boledoDataModel>();
  
  ngOnInit(): void {
    
    this.populateTable();
    
  }
  populateTable() {
    this.boledoService.getAllBoledoEntries('active').subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  dateFilter(dateFilterInput: string) {
      this.boledoService.getBoledo(dateFilterInput.toString()).subscribe((data) => {
        this.dataSource.data = data;
      });
    }

  Delete() {
    
  }
  Edit() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = this.dataSource;

    this.dialog.open(BoledoAddEditDialogComponent, dialogConfig);
  }

  Add() {
    
    this.dialog.open(BoledoAddEditDialogComponent);
  }
}
