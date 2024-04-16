import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../../Services/auth.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm;
  errorMessage: string | null = null;
  authService = inject(AuthService);

  constructor(private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onLoginClicked() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.authService.login(formData.email!, formData.password!).subscribe({
        next: () => {
          this.router.navigateByUrl('/home');
          console.log(this.authService.currentUserSig(), ' Logged In*');
        },
        error: (err) => {
          console.log(err);
          this.errorMessage = 'Invalid Email and Passowrd';
          this.loginForm.reset();
        },
      });
    } else {
      this.errorMessage = 'Invalid Email and Passowrd';
    }
  }
}
