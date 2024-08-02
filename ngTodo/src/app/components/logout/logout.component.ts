import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {

  constructor(private authService: AuthService, private router: Router){
  
  }

  logout() {
    this.authService.logout();
    if(!this.authService.checkLogin()){
      this.router.navigateByUrl("home");
    }
  }

}
