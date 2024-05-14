import { Component, ElementRef, Input, OnInit, ViewChild, viewChild } from '@angular/core';
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
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';

import {
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { AgentAddEditDialogComponent } from '../agent-add-edit-dialog/agent-add-edit-dialog.component';
import { AgentService } from '../../Services/agent.service';
import { agentDataModel } from '../../DataModels/agentData.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterOutlet, RouterLink } from '@angular/router';
import { GlobalService } from '../../Services/global.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { AngularFirestore } from '@angular/fire/compat/firestore';



@Component({
  selector: 'app-agent',
  standalone: true,
  templateUrl: './agent.component.html',
  styleUrl: './agent.component.css',
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
    MatSelectModule,
    RouterOutlet,
    RouterLink,
    MatPaginatorModule,
    MatSortModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
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
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('agentSearch') searchField!:ElementRef;
  changeDet: any; // Change detector reference

  businessNames: string[] = [];

  constructor(
    private dialog: MatDialog, // MatDialog for opening dialogs
    private agentSerive: AgentService, // AgentService for CRUD operations
    private snackBar: MatSnackBar, // MatSnackBar for displaying snack bar messages
    private globalService: GlobalService,
    private db: AngularFirestore
  ) {}


  ngOnInit(): void {
    this.populateTable(); // Populate the table with agent data

  }

  applyFilter(filterValue: any) {
    
    const value = filterValue.target.value.trim().toLowerCase();
    this.dataSource.filter = value;

    }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.searchField.nativeElement.focus();
    this.changeDet.detectChanges();
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

    const UpdateAgent = {
      ...data,
      status: 'inactive',
    } as Partial<agentDataModel>;
    UpdateAgent.editedBy = this.globalService.username!;
    delete UpdateAgent.id;

    this.agentSerive.updateAgent(id!, UpdateAgent).subscribe((val) => {
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
      this.dataSource.data = data;
    });
  }

}
