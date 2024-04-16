import { Component, Inject } from '@angular/core';
import { BoledoService } from '../../Services/boledo.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { boledoDataModel } from '../../DataModels/boledoData.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormField } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { tap } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { GlobalService } from '../../Services/global.service';

@Component({
  selector: 'app-boledo-add-edit-dialog',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatInputModule,
    MatFormField,
    ReactiveFormsModule,
  ],
  templateUrl: './boledo-add-edit-dialog.component.html',
  styleUrl: './boledo-add-edit-dialog.component.css',
})
export class BoledoAddEditDialogComponent {
  title: string = ''; // Title for the dialog
  boledoAddEditForm: FormGroup; // Form group for adding/editing Boledo data
  updateBoledoID: string = ''; // ID of the Boledo entry being updated
  defaultDate = this.boledoData.date
    ? new Date(this.boledoData.date) // Default date if provided
    : new Date(); // Current date if not provided

  constructor(
    private boledoService: BoledoService,
    @Inject(MAT_DIALOG_DATA) private boledoData: boledoDataModel, // Data passed to the dialog
    public dialogRef: MatDialogRef<BoledoAddEditDialogComponent>, // Reference to the dialog
    private globalService: GlobalService
  ) {
    // Initialize form group
    this.boledoAddEditForm = new FormGroup({
      // Date control with default value and required validator
      date: new FormControl(this.defaultDate, Validators.required),
      // Winning number control with required validator and custom two-digit validator
      winningNumber: new FormControl(this.boledoData.winningNumber, [
        Validators.required,
        this.twoDigitValidator,
      ]),
    });
    this.updateBoledoID = this.boledoData.id; // Assign ID of Boledo entry being updated

    // Set dialog title based on whether it's for adding or updating Boledo entry
    if (!this.updateBoledoID) {
      this.title = 'New Boledo';
    } else {
      this.title = 'Update Boledo';
    }
  }

  // Custom validator function for two digits
  private twoDigitValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const value = control.value;
    if (isNaN(value) || value < 0 || value > 99) {
      return { invalidNumber: true };
    }
    return null;
  }

  // Function to save Boledo data
  save() {
    if (this.updateBoledoID && this.boledoAddEditForm.valid) {
      // Update Boledo entry
      const updateBoledoData = {
        ...this.boledoAddEditForm.value,
      } as Partial<boledoDataModel>;
      updateBoledoData.date = new Date(
        updateBoledoData.date!
      ).toLocaleDateString(); // Convert date to string
      updateBoledoData.editedBy = this.globalService.username!;
      delete updateBoledoData.id; // Remove ID field

      // Call service to update Boledo entry
      this.boledoService
        .updateBoledoEntry(this.updateBoledoID, updateBoledoData)
        .subscribe((val) => {
          this.resetFormAndCloseDialog('success'); // Reset form and close dialog
        });
    } else {
      if (this.boledoAddEditForm.valid) {
        // Add new Boledo entry
        const newBoledo = {
          ...this.boledoAddEditForm.value,
        } as boledoDataModel;
        newBoledo.status = 'active'; // Set status to active
        newBoledo.date = new Date(newBoledo.date).toLocaleDateString(); // Convert date to string
        newBoledo.createdBy = this.globalService.username!;

        // Call service to add new Boledo entry
        this.boledoService
          .addNewBoledo(newBoledo)
          .pipe(tap((boledoID) => this.resetFormAndCloseDialog('success')))
          .subscribe();
      }
    }
  }

  // Function to cancel and close the dialog
  cancel() {
    this.dialogRef.close();
  }

  // Function to reset form and close the dialog with given data
  private resetFormAndCloseDialog(data: any) {
    this.boledoAddEditForm.reset(); // Reset form
    this.dialogRef.close(data); // Close dialog with provided data
  }
}
