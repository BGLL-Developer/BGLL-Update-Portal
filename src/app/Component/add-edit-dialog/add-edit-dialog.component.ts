import { Component } from '@angular/core';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-add-edit-dialog',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  templateUrl: './add-edit-dialog.component.html',
  styleUrl: './add-edit-dialog.component.css',
})
export class AddEditDialogComponent {

  constructor(public dialogRef: MatDialogRef<AddEditDialogComponent>) {}

  Cancel() {
    this.dialogRef.close();
  }

  Save() {
    throw new Error('Method not implemented.');
  }
}
