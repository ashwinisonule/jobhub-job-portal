import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Job, JobService } from '../../services/job';
import {
  Application,
  ApplicationService
} from '../../services/application';

@Component({
  selector: 'app-apply-job',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './apply-job.html',
  styleUrl: './apply-job.css'
})
export class ApplyJobComponent implements OnInit {

  jobId = '';
  job: Job | null = null;

  application = {
    fullName: '',
    email: '',
    phone: '',
    education: '',
    skills: '',
    coverLetter: ''
  };

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private applicationService: ApplicationService,
    public router: Router
  ) {}

  ngOnInit(): void {

    this.jobId =
      this.route.snapshot.paramMap.get('id') || '';

    this.loadJob();

    const userData =
      localStorage.getItem('jobhubUser');

    if (!userData) {

      alert('Please login first.');

      this.router.navigate(['/login']);

      return;
    }

    const user = JSON.parse(userData);

    this.application.fullName =
      user.name || '';

    this.application.email =
      user.email || '';
  }


  loadJob(): void {

    if (!this.jobId) {
      return;
    }

    this.jobService.getJobById(this.jobId).subscribe({

      next: (data: Job) => {

        this.job = data;

        console.log('Apply Job:', this.job);

      },

      error: (error: any) => {

        console.error(
          'Job loading error:',
          error
        );

      }

    });

  }


  submitApplication(): void {

    if (!this.job) {

      alert('Job not found!');

      return;
    }


    const userData =
      localStorage.getItem('jobhubUser');

    if (!userData) {

      alert('Please login first.');

      this.router.navigate(['/login']);

      return;
    }

    const user = JSON.parse(userData);


    if (!user._id) {

      alert('User information not found. Please login again.');

      localStorage.removeItem('jobhubUser');

      this.router.navigate(['/login']);

      return;
    }


    if (
      !this.application.fullName ||
      !this.application.email ||
      !this.application.phone ||
      !this.application.education ||
      !this.application.skills
    ) {

      alert('Please fill all required fields.');

      return;
    }


    const applicationData: Application = {

      userId: user._id,

      jobId: this.job._id!,

      jobTitle: this.job.title,

      company: this.job.company,

      candidateName:
        this.application.fullName,

      candidateEmail:
        this.application.email,

      phone:
        this.application.phone,

      education:
        this.application.education,

      skills:
        this.application.skills,

      coverLetter:
        this.application.coverLetter,

      status: 'Applied'

    };


    console.log(
      'Submitting Application:',
      applicationData
    );


    this.applicationService
      .apply(applicationData)
      .subscribe({

        next: (response) => {

          console.log(
            'Application Saved:',
            response
          );

          alert(
            'Application submitted successfully!'
          );

          this.router.navigate([
            '/applications'
          ]);

        },

        error: (error: any) => {

          console.error(
            'Application submission error:',
            error
          );

          alert(
            error.error?.message ||
            'Application submission failed!'
          );

        }

      });

  }

}