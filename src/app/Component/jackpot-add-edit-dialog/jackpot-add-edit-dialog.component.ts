import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
import { JackpotService } from '../../Services/jackpot.service';
import { jackpotDataModel } from '../../DataModels/jackpotData.model';

@Component({
  selector: 'app-jackpot-add-edit-dialog',
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
  templateUrl: './jackpot-add-edit-dialog.component.html',
  styleUrl: './jackpot-add-edit-dialog.component.css',
})
export class JackpotAddEditDialogComponent {
  title: string = ''; // Title for the dialog
  jackpotAddEditForm: FormGroup; // Form group for jackpot add/edit form
  updateJackpotID: string = ''; // ID of the jackpot being updated
  defaultDate = this.jackpotData.date // Default date if provided, otherwise current date
    ? new Date(this.jackpotData.date)
    : new Date();

  constructor(
    public dialogRef: MatDialogRef<JackpotAddEditDialogComponent>, // Reference to the dialog
    private jackpotService: JackpotService,
    @Inject(MAT_DIALOG_DATA) private jackpotData: jackpotDataModel // Injecting data into dialog
  ) {
    // Initializing form group with default values and validators
    this.jackpotAddEditForm = new FormGroup({
      date: new FormControl(this.defaultDate, Validators.required),
      firstWinningNumber: new FormControl(this.jackpotData.firstWinningNumber, [
        Validators.required,
        this.fourDigitValidator,
      ]),
      secondWinningNumber: new FormControl(
        this.jackpotData.secondWinningNumber,
        [Validators.required, this.fourDigitValidator]
      ),
      thirdWinningNumber: new FormControl(this.jackpotData.thirdWinningNumber, [
        Validators.required,
        this.fourDigitValidator,
      ]),
    });

    this.updateJackpotID = jackpotData.id; // Setting update jackpot ID

    // Setting dialog title based on whether it's an update or add operation
    if (
      this.updateJackpotID == '' ||
      this.updateJackpotID == undefined ||
      this.updateJackpotID == null
    ) {
      this.title = 'New Jackpot';
    } else {
      this.title = 'Update Jackpot';
    }
  }

  // Custom validator function for ensuring four digits
  private fourDigitValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const value = control.value;
    if (isNaN(value) || value < 0 || value > 9999) {
      return { invalidNumber: true };
    }
    return null;
  }

  // Save changes to the jackpot
  save() {
    if (this.updateJackpotID) {
      // Updating existing jackpot entry
      const updateJackpotData = {
        ...this.jackpotAddEditForm.value,
      } as Partial<jackpotDataModel>;

      updateJackpotData.date = new Date(
        updateJackpotData.date!
      ).toLocaleDateString();

      delete updateJackpotData.id;

      // Calling service to update jackpot
      this.jackpotService
        .updateJackpot(this.updateJackpotID, updateJackpotData)
        .subscribe((val) => {
          this.jackpotAddEditForm.reset();
          this.dialogRef.close('success');
        });
    } else {
      // Adding new jackpot entry
      if (this.jackpotAddEditForm.valid) {
        const newJackpot = {
          ...this.jackpotAddEditForm.value,
        } as jackpotDataModel;

        newJackpot.status = 'active';
        newJackpot.date = new Date(newJackpot.date).toLocaleDateString();

        // Calling service to add new jackpot
        this.jackpotService
          .addJackpot(newJackpot)
          .pipe(
            tap((jackpotID) => {
              this.jackpotAddEditForm.reset();
              this.dialogRef.close('success');
            })
          )
          .subscribe();
      }
    }
  }

  // Close the dialog without saving changes
  cancel() {
    this.dialogRef.close();
  }
}
