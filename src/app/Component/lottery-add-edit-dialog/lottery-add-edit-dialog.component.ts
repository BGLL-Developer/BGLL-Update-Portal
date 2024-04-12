import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  lotteryAddEditForm;
  updateLotteryID = '';
  title = '';
  constructor(
    private lotteryService: LotteryService,
    @Inject(MAT_DIALOG_DATA) lotteryData: lotteryDataModel,
    public dialogRef: MatDialogRef<LotteryAddEditDialogComponent>
  ) {
    this.lotteryAddEditForm = new FormGroup({
      date: new FormControl(lotteryData.date, Validators.required),
      winningNumber: new FormControl(
        lotteryData.winningNumber,
        Validators.required
      ),
    });

    this.updateLotteryID = lotteryData.id;

    if (
      this.updateLotteryID == '' ||
      this.updateLotteryID == undefined ||
      this.updateLotteryID == null
    ) {
      this.title = 'Add New Lottery';
    } else {
      this.title = 'Update Boledo';
    }
  }
  cancel() {
    this.dialogRef.close();
  }
  save() {
    if (this.updateLotteryID) {
      const updateLotteryData = {
        ...this.lotteryAddEditForm.value,
      } as Partial<lotteryDataModel>;

      delete updateLotteryData.id;

      this.lotteryService
        .updateLottery(this.updateLotteryID, updateLotteryData)
        .subscribe((val) => {
          this.lotteryAddEditForm.reset();
          this.dialogRef.close(val);
        });
    } else {
      if (this.lotteryAddEditForm.valid) {
        const newLottery = {
          ...this.lotteryAddEditForm.value,
        } as lotteryDataModel;
        newLottery.status = 'active';

        this.lotteryService
          .addNewLottery(newLottery)
          .pipe(
            tap((lotteryID) => {
              this.lotteryAddEditForm.reset();
              this.dialogRef.close(lotteryID);
            })
          )
          .subscribe();
      }
    }
  }
}
