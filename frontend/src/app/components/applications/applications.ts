import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import {
  Application,
  ApplicationService
} from '../../services/application';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './applications.html',
  styleUrl: './applications.css'
})
export class ApplicationsComponent implements OnInit {

  applications: Application[] = [];

  loading = true;


  constructor(
    private applicationService: ApplicationService,
    private cdr: ChangeDetectorRef
  ) {}


  ngOnInit(): void {

    this.loadApplications();

  }


  loadApplications(): void {

    this.loading = true;


    const userData =
      localStorage.getItem('jobhubUser');


    if (!userData) {

      console.error(
        'No logged-in user found.'
      );

      this.applications = [];

      this.loading = false;

      this.cdr.detectChanges();

      return;
    }


    const user = JSON.parse(userData);


    if (!user._id) {

      console.error(
        'Logged-in user ID not found.'
      );

      this.applications = [];

      this.loading = false;

      this.cdr.detectChanges();

      return;
    }


    console.log(
      'Loading applications for user:',
      user._id
    );


    this.applicationService
      .getApplications(user._id)
      .subscribe({

        next: (data: Application[]) => {

          console.log(
            'MY APPLICATIONS:',
            data
          );

          this.applications = [
            ...data
          ];

          this.loading = false;

          this.cdr.detectChanges();

        },


        error: (error: any) => {

          console.error(
            'APPLICATION API ERROR:',
            error
          );

          this.applications = [];

          this.loading = false;

          this.cdr.detectChanges();

        }

      });

  }

}