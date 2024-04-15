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
import { MatSnackBar } from '@angular/material/snack-bar';

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
  ]; // Columns to be displayed in the table
  dataSource = new MatTableDataSource<agentDataModel>(); // DataSource for MatTable
  @ViewChild('matSortAgent') sortAgent!: MatSort; // Reference to MatSort
  changeDet: any; // Change detector reference

  constructor(
    private dialog: MatDialog, // MatDialog for opening dialogs
    private agentSerive: AgentService, // AgentService for CRUD operations
    private snackBar: MatSnackBar // MatSnackBar for displaying snack bar messages
  ) {}

  ngOnInit(): void {
    this.populateTable(); // Populate the table with agent data
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sortAgent; // Assign MatSort to the DataSource after view initialization
  }

  // Populate the table with agent data
  populateTable() {
    this.agentSerive.getAllAgents('active').subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  // Delete an agent
  deleteAgent(data: Partial<agentDataModel>) {
    const id = data.id;

    const newAgent = { ...data } as Partial<agentDataModel>;
    newAgent.status = 'inactive';
    delete newAgent.id;

    this.agentSerive.updateAgent(id!, newAgent).subscribe((val) => {
      if (val === undefined) {
        this.refreshTable(true);
        this.openSnackBar('Agent Removed!', 'success-snackBar');
      } else {
        this.openSnackBar('Agent was not Removed!', 'error-snakcBar');
      }
    });
  }

  // Edit an agent
  editAgent(data: Partial<agentDataModel>) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = data;

    this.dialog
      .open(AgentAddEditDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe((val) => {
        if (val) {
          this.refreshTable(true);
          this.openSnackBar('Agent Updated!', 'success-snackBar');
        } else {
          this.openSnackBar('Agent was not Updated!', 'error-snackBar');
        }
      });
  }

  // Add a new agent
  addAgent() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = '';

    this.dialog
      .open(AgentAddEditDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe((val) => {
        if (val) {
          this.refreshTable(true);
          this.openSnackBar('Agent Was Added!', 'success-snackBar');
        } else {
          this.openSnackBar('Agent was not Added!', 'error-snackBar');
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

  // Filter agents by district
  filterByDistrict(event: any) {
    const selectedDistrict = event.value;
    this.agentSerive.getAgentByDistrict(selectedDistrict).subscribe((data) => {
      console.log(data);
      this.dataSource.data = data;
    });
  }
}
