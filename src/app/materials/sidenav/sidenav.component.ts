import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';

@NgModel({
  import: SidenavComponent,
  
})

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  isOpen: boolean = false;

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }
}
