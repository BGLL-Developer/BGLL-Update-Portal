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
  title = '';
  jackpotAddEditForm;
  updateJackpotID = '';

  constructor(
    public dialogRef: MatDialogRef<JackpotAddEditDialogComponent>,
    private jackpotService: JackpotService,
    @Inject(MAT_DIALOG_DATA) jackpotData: jackpotDataModel
  ) {
    this.jackpotAddEditForm = new FormGroup({
      date: new FormControl(jackpotData.date, Validators.required),
      firstWinningNumber: new FormControl(
        jackpotData.firstWinningNumber,
        Validators.required
      ),
      secondWinningNumber: new FormControl(
        jackpotData.secondWinningNumber,
        Validators.required
      ),
      thirdWinningNumber: new FormControl(
        jackpotData.thirdWinningNumber,
        Validators.required
      ),
    });
    this.updateJackpotID = jackpotData.id;
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

  save() {
    if (this.updateJackpotID) {
      const updateJackpotData = {
        ...this.jackpotAddEditForm.value,
      } as Partial<jackpotDataModel>;

      delete updateJackpotData.id;

      this.jackpotService
        .updateJackpot(this.updateJackpotID, updateJackpotData)
        .subscribe((val) => {
          this.jackpotAddEditForm.reset();
          this.dialogRef.close(val);
        });
    } else {
      if (this.jackpotAddEditForm.valid) {
        const newJackpot = {
          ...this.jackpotAddEditForm.value,
        } as jackpotDataModel;
        newJackpot.status = 'active';

        this.jackpotService
          .addJackpot(newJackpot)
          .pipe(
            tap((jackpotID) => {
              this.jackpotAddEditForm.reset();
              this.dialogRef.close(jackpotID);
            })
          )
          .subscribe();
      }
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
