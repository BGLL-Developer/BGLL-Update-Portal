import { Component } from '@angular/core';
import { HeaderComponent } from '../../Component/header/header.component';

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.css',
})
export class ErrorPageComponent {}
