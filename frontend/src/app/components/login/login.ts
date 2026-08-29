import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  loginData = {

    email: '',
    password: ''

  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {

    if (
      !this.loginData.email ||
      !this.loginData.password
    ) {

      alert('Please enter email and password.');

      return;

    }

    this.authService
      .login(this.loginData)
      .subscribe({

        next: (response) => {

          localStorage.setItem(
            'jobhubUser',
            JSON.stringify(response.user)
          );

          alert('Login successful!');

          this.router.navigate([
            '/home'
          ]);

        },

        error: (error: any) => {

          alert(
            error.error?.message ||
            'Invalid email or password!'
          );

        }

      });

  }

}