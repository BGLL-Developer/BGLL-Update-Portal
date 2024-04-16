import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../Services/auth.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from '../../Services/global.service';

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

  constructor(private router: Router, private globalService: GlobalService) {
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
          this.globalService.username = formData.email!;
          this.router.navigateByUrl('/dashboard');
          console.log(this.globalService.username, ' Logged In*');
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
