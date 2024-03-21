import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-lottery',
  standalone: true,
  templateUrl: './lottery.component.html',
  styleUrl: './lottery.component.css',
  imports: [HeaderComponent],
})
export class LotteryComponent {}
