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
import { LotteryService } from '../../Services/lottery.service';
import { lotteryDataModel } from '../../DataModels/lotteryData.model';

@Component({
  selector: 'app-lottery-add-edit-dialog',
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
  templateUrl: './lottery-add-edit-dialog.component.html',
  styleUrl: './lottery-add-edit-dialog.component.css',
})
export class LotteryAddEditDialogComponent {
  title: string = ''; // Title for the dialog
  lotteryAddEditForm: FormGroup; // Form group for lottery add/edit form
  updateLotteryID: string = ''; // ID of the lottery being updated
  defaultDate = this.lotteryData.date // Default date if provided, otherwise current date
    ? new Date(this.lotteryData.date)
    : new Date();

  constructor(
    private lotteryService: LotteryService,
    @Inject(MAT_DIALOG_DATA) private lotteryData: lotteryDataModel, // Injecting data into dialog
    public dialogRef: MatDialogRef<LotteryAddEditDialogComponent> // Reference to the dialog
  ) {
    // Initializing form group with default values and validators
    this.lotteryAddEditForm = new FormGroup({
      date: new FormControl(this.defaultDate, Validators.required),
      winningNumber: new FormControl(this.lotteryData.winningNumber, [
        Validators.required,
        this.twoDigitValidator,
      ]),
    });

    this.updateLotteryID = lotteryData.id; // Setting update lottery ID

    // Setting dialog title based on whether it's an update or add operation
    if (!this.updateLotteryID) {
      this.title = 'New Lottery';
    } else {
      this.title = 'Update Lottery';
    }
  }

  // Custom validator function for ensuring two digits
  private twoDigitValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const value = control.value;
    if (isNaN(value) || value < 0 || value > 99) {
      return { invalidNumber: true };
    }
    return null;
  }

  // Close the dialog without saving changes
  cancel() {
    this.dialogRef.close();
  }

  // Save changes to the lottery
  save() {
    if (this.updateLotteryID && this.lotteryAddEditForm.valid) {
      // Updating existing lottery entry
      const updateLotteryData = {
        ...this.lotteryAddEditForm.value,
      } as Partial<lotteryDataModel>;
      updateLotteryData.date = new Date(
        updateLotteryData.date!
      ).toLocaleDateString();

      delete updateLotteryData.id;

      // Calling service to update lottery
      this.lotteryService
        .updateLottery(this.updateLotteryID, updateLotteryData)
        .subscribe((val) => {
          this.lotteryAddEditForm.reset();
          this.dialogRef.close('success');
        });
    } else {
      if (this.lotteryAddEditForm.valid) {
        // Adding new lottery entry
        const newLottery = {
          ...this.lotteryAddEditForm.value,
        } as lotteryDataModel;

        newLottery.status = 'active';
        newLottery.date = new Date(newLottery.date).toLocaleDateString();

        // Calling service to add new lottery
        this.lotteryService
          .addNewLottery(newLottery)
          .pipe(
            tap((lotteryID) => {
              this.lotteryAddEditForm.reset();
              this.dialogRef.close('success');
            })
          )
          .subscribe();
      }
    }
  }
}
