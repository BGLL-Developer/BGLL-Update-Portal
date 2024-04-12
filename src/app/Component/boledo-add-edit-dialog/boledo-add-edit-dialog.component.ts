import { Component, Inject } from '@angular/core';
import { BoledoService } from '../../Services/boledo.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  title = '';
  dateControl = new FormControl();
  boledoAddEditForm;
  updateBoledoID = '';

  constructor(
    private boledoService: BoledoService,
    @Inject(MAT_DIALOG_DATA) boledoData: boledoDataModel,
    public dialogRef: MatDialogRef<BoledoAddEditDialogComponent>
  ) {
    this.boledoAddEditForm = new FormGroup({
      date: new FormControl(boledoData.date, Validators.required),
      winningNumber: new FormControl(
        boledoData.winningNumber,
        Validators.required
      ),
    });
    this.updateBoledoID = boledoData.id;
    this.dateControl.setValue(boledoData.date);

    if (
      this.updateBoledoID == '' ||
      this.updateBoledoID == undefined ||
      this.updateBoledoID == null
    ) {
      this.title = 'Add New Boledo';
    } else {
      this.title = 'Update Boledo';
    }
  }

  save() {
    if (this.updateBoledoID) {
      const updateBoledoData = {
        ...this.boledoAddEditForm.value,
      } as Partial<boledoDataModel>;
      if(updateBoledoData.date != this.dateControl.value) {
        updateBoledoData.date = this.dateControl.value;
      }
      delete updateBoledoData.id;

      this.boledoService
        .updateBoledoEntry(this.updateBoledoID, updateBoledoData)
        .subscribe((val) => {
          this.boledoAddEditForm.reset();
          this.dialogRef.close(val);
        });
    } else {
      if (this.boledoAddEditForm.valid) {
        const newBoledo = {
          ...this.boledoAddEditForm.value,
        } as boledoDataModel;
        newBoledo.status = 'active';
        newBoledo.date = this.dateControl.value.toString();

        this.boledoService
          .addNewBoledo(newBoledo)
          .pipe(
            tap((boledoID) => {
              this.boledoAddEditForm.reset();
              this.dialogRef.close(boledoID);
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
