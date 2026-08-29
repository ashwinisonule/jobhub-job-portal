import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  Router
} from '@angular/router';

import {
  Job,
  JobService
} from '../../services/job';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-details.html',
  styleUrl: './job-details.css'
})
export class JobDetailsComponent
  implements OnInit {

  job: Job | null = null;

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    public router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    const id =
      this.route.snapshot.paramMap.get('id');

    console.log('JOB ID:', id);

    if (!id) {
      return;
    }

    this.jobService.getJobById(id).subscribe({

      next: (data: Job) => {

        console.log(
          'JOB DETAILS:',
          data
        );

        this.job = { ...data };

        // Update details page immediately
        this.cdr.detectChanges();

      },

      error: (error: any) => {

        console.error(
          'JOB DETAILS ERROR:',
          error
        );

        this.job = null;

        this.cdr.detectChanges();

      }

    });

  }

  applyJob(): void {

    if (!this.job?._id) {

      alert('Job not found!');

      return;

    }

    this.router.navigate([
      '/apply-job',
      this.job._id
    ]);

  }

}