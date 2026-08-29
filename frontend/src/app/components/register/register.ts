import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {

  user = {

    name: '',
    email: '',
    password: ''

  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register(): void {

    if (
      !this.user.name ||
      !this.user.email ||
      !this.user.password
    ) {

      alert('Please fill all fields.');

      return;

    }

    this.authService
      .register(this.user)
      .subscribe({

        next: () => {

          alert(
            'Registration successful!'
          );

          this.router.navigate([
            '/login'
          ]);

        },

        error: (error: any) => {

          alert(
            error.error?.message ||
            'Registration failed!'
          );

        }

      });

  }

}