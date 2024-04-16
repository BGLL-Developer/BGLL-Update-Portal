import { Component } from '@angular/core';
import { HeaderComponent } from '../../Component/header/header.component';
import { RouterOutlet, RouterLink } from '@angular/router';


@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, RouterLink ],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.css',
})
export class ErrorPageComponent {}
