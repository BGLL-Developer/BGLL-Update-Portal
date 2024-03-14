import { Routes } from '@angular/router';
import { LoginPageComponent } from './Page/login-page/login-page.component';
import { HomePageComponent } from './Page/home-page/home-page.component';
import { BoledoComponent } from './Component/boledo/boledo.component';
import { JackpotComponent } from './Component/jackpot/jackpot.component';
import { LotteryComponent } from './Component/lottery/lottery.component';
import { AgentComponent } from './Component/agent/agent.component';
import { ErrorPageComponent } from './Page/error-page/error-page.component';

export const routes: Routes = [
  // Routes the application to diffrent components depending on what the user is doing
  { path: 'login', title: 'Login', component: LoginPageComponent },
  {
    path: 'home',
    title: 'Home',
    component: HomePageComponent,
    children: [
      { path: 'boledo', component: BoledoComponent },
      { path: 'jackpot', component: JackpotComponent },
      { path: 'lottery', component: LotteryComponent },
      { path: 'agent', component: AgentComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', title: 'Page Not Found', component: ErrorPageComponent },
];
