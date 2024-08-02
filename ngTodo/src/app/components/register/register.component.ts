import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  newUser: User = new User();

  constructor(private authService: AuthService, private router: Router) {
    
  }

  register(newUser: User) {
     this.authService.register(newUser).subscribe({
      next:(data) => {
        this.router.navigateByUrl('todo');
      },
      error: (err) => {
        console.log(err + " in RegisterComponent.register()")
      }

     });
  }


}
