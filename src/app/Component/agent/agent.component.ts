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
import { MatSelectModule } from '@angular/material/select';
import { AgentAddEditDialogComponent } from '../agent-add-edit-dialog/agent-add-edit-dialog.component';
import { AgentService } from '../../Services/agent.service';
import { agentDataModel } from '../../DataModels/agentData.model';
import { MatSort } from '@angular/material/sort';

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
    MatSelectModule,
  ],
})
export class AgentComponent implements OnInit {
  displayedColumns: string[] = [
    'businessName',
    'address',
    'community',
    'district',
    'action',
  ];

  dataSource = new MatTableDataSource<agentDataModel>();
  @ViewChild('matSortAgent') sortAgent!: MatSort;
  changeDet: any;

  constructor(private dialog: MatDialog, private agentSerive: AgentService) {}

  ngOnInit(): void {
    this.populateTable();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sortAgent;
  }

  populateTable() {
    this.agentSerive.getAllAgents('active').subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  Delete() {
    throw new Error('Method not implemented.');
  }

  Edit() {
    throw new Error('Method not implemented.');
  }

  Add() {
    this.dialog.open(AgentAddEditDialogComponent);
  }
}
