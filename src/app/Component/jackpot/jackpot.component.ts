import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-jackpot',
  standalone: true,
  templateUrl: './jackpot.component.html',
  styleUrl: './jackpot.component.css',
  imports: [HeaderComponent],
})
export class JackpotComponent {}
