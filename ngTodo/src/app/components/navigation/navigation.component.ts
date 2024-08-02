import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LogoutComponent } from "../logout/logout.component";
import { LoginComponent } from "../login/login.component";
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    RouterLink,
    NgbModule,
    LogoutComponent,
    LoginComponent,
    FormsModule,
    CommonModule
],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {

  isCollapsed: boolean = false;

  constructor(private authService: AuthService) {}

  checkLogin() : boolean {
    return this.authService.checkLogin();
  }
  
}
