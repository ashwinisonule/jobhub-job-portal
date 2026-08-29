import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import {
  Job,
  JobService
} from '../../services/job';

interface Company {
  name: string;
  location: string;
  jobs: number;
  category: string;
}

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './companies.html',
  styleUrl: './companies.css'
})
export class CompaniesComponent
  implements OnInit {

  companies: Company[] = [];

  loading = true;

  constructor(
    private jobService: JobService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies(): void {

    this.loading = true;

    this.jobService.getJobs().subscribe({

      next: (jobs: Job[]) => {

        console.log(
          'Jobs received for companies:',
          jobs
        );

        const companyMap =
          new Map<string, Company>();

        jobs.forEach((job: Job) => {

          const companyName =
            (job.company || '').trim();

          if (!companyName) {
            return;
          }

          const existing =
            companyMap.get(companyName);

          if (existing) {

            existing.jobs++;

          } else {

            companyMap.set(
              companyName,
              {
                name: companyName,
                location: job.location || 'Not specified',
                jobs: 1,
                category: job.category || 'General'
              }
            );

          }

        });

        this.companies =
          Array.from(companyMap.values());

        this.loading = false;

        // Screen immediately update
        this.cdr.detectChanges();

      },

      error: (error: any) => {

        console.error(
          'Companies loading error:',
          error
        );

        this.companies = [];

        this.loading = false;

        this.cdr.detectChanges();

      }

    });

  }

}