import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class ProfileComponent implements OnInit {

  user: any = null;

  ngOnInit(): void {
    const userData = localStorage.getItem('jobhubUser');

    if (userData) {
      this.user = JSON.parse(userData);
    }
  }

}