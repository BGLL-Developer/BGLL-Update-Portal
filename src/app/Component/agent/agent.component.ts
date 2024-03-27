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
import { AddEditAgentDialogComponent } from './add-edit-agent-dialog/add-edit-agent-dialog.component';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-agent',
  standalone: true,
  templateUrl: './agent.component.html',
  styleUrl: './agent.component.css',
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
    AddEditAgentDialogComponent,
    MatSelectModule
  ],
})
export class AgentComponent {

  constructor(private dialog: MatDialog) {}

  @Input() displayedColumns: string[] = ['bname', 'address', 'community', 'district', 'action'];
  dataSource = [
    { bname: 'Mall', address: '21 Apple Street', community: 'Belmopan City', district: 'Cayo' },
    { bname: 'Huang SuperStore', address: '12 Mango Street', community: 'Belize City', district: 'Belize' },
  ];


Delete() {
throw new Error('Method not implemented.');
}

Edit() {
throw new Error('Method not implemented.');
}

Add() {

    this.dialog.open(AddEditAgentDialogComponent);
}

  
}
