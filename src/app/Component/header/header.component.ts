import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  authService = inject(AuthService);

  constructor(private router: Router) {}

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      if (user != null || user != undefined) {
        this.authService.currentUserSig.set({
          email: user.email!,
          username: user.displayName!,
        });
      } else {
        this.router.navigateByUrl('/login');
        this.authService.currentUserSig.set(null);
      }
    });
  }

  logout() {
    this.authService.logout();
    console.log('User Logged Out');
  }
}
