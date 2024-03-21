import { Routes } from '@angular/router';
import { LoginPageComponent } from './Page/login-page/login-page.component';
import { HomePageComponent } from './Page/home-page/home-page.component';
import { BoledoComponent } from './Component/boledo/boledo.component';
import { JackpotComponent } from './Component/jackpot/jackpot.component';
import { LotteryComponent } from './Component/lottery/lottery.component';
import { AgentComponent } from './Component/agent/agent.component';
import { ErrorPageComponent } from './Page/error-page/error-page.component';
import { HomeComponent } from './Component/home/home.component';

export const routes: Routes = [
  // Routes the application to diffrent components depending on what the user is doing
  { path: 'login', title: 'Login', component: LoginPageComponent },
  { path: 'home', title: 'Home', component: HomeComponent },
  { path: 'boledo', title: 'Boledo', component: BoledoComponent },
  { path: 'jackpot', title: 'Jackpot', component: JackpotComponent },
  { path: 'lottery', title: 'Lottery', component: LotteryComponent },
  { path: 'agent', title: 'Agent', component: AgentComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', title: 'Page Not Found', component: ErrorPageComponent },
];
