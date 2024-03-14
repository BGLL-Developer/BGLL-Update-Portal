import { Component } from '@angular/core';
import { BoledoComponent } from '../../Component/boledo/boledo.component';
import { LotteryComponent } from '../../Component/lottery/lottery.component';
import { JackpotComponent } from '../../Component/jackpot/jackpot.component';
import { AgentComponent } from '../../Component/agent/agent.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  imports: [
    BoledoComponent,
    LotteryComponent,
    JackpotComponent,
    AgentComponent,
  ],
})
export class HomePageComponent {}
