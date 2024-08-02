import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginUser: User = new User();

  constructor(private authService: AuthService, private router: Router){}

  login(loginUser: User) {
    this.authService.login(loginUser.username, loginUser.password).subscribe({
      next: (data) => {
        this.router.navigateByUrl("todo");
      },
      error: (err) => {
        this.router.navigateByUrl("register");
      }
    });
  }

  

}
