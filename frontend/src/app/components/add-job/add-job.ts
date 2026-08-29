import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Job, JobService } from '../../services/job';

@Component({
  selector: 'app-add-job',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-job.html',
  styleUrl: './add-job.css'
})
export class AddJobComponent {

  job: Job = {
    title: '',
    company: '',
    location: '',
    category: '',
    salary: '',
    jobType: '',
    description: ''
  };

  constructor(
    private jobService: JobService,
    public router: Router
  ) {}

  addJob(): void {

    this.jobService.addJob(this.job).subscribe({

      next: () => {

        alert('Job added successfully!');

        this.router.navigate(['/jobs']);

      },

      error: (error: any) => {

        console.error('Add Job Error:', error);

        alert(
          error.error?.message ||
          'Job not added!'
        );

      }

    });

  }

}