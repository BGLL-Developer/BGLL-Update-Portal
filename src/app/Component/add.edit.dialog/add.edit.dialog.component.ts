import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { environment } from '../../../environments/environment';
environment;

@Component({
  selector: 'app-add.edit.dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './add.edit.dialog.component.html',
  styleUrl: './add.edit.dialog.component.css',
})
export class AddEditDialogComponent {
  constructor(private DialogRef: MatDialogRef<AddEditDialogComponent>) {}

  save() {
    throw new Error('Method not implemented.');
  }
  close() {
    this.DialogRef.close();
  }
}
