import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-aedialog',
  standalone: true,
  imports: [MatFormFieldModule, MatDialogModule],
  templateUrl: './aedialog.component.html',
  styleUrl: './aedialog.component.css',
})
export class AEDialogComponent {
  save() {
    throw new Error('Method not implemented.');
  }
  close() {
    throw new Error('Method not implemented.');
  }
}
