import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../Services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from '../../Services/global.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule, MatIconModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {

  resetForm;
  errorMessage: string | null = null;
  authService = inject(AuthService);
  successMessage: string | null = null;

  constructor(private router: Router, private globalService: GlobalService,
    private afAuth: AngularFireAuth,
  ) {

    this.resetForm = new FormGroup({
      email: new FormControl('', Validators.required),
    });
  }

  onConfirmClicked() {

    if (this.resetForm.valid) {
      const email = this.resetForm.value.email ?? '';
      this.authService.resetPassword(email);
      this.successMessage = "Email Sent Successfully.";
      this.resetForm.reset();

    }

  }



  BackToLogin() {
    this.router.navigateByUrl('/login');
  }
}
