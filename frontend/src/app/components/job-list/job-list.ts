import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import {
  Job,
  JobService
} from '../../services/job';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './job-list.html',
  styleUrl: './job-list.css'
})
export class JobListComponent implements OnInit {

  jobs: Job[] = [];

  searchText = '';
  selectedLocation = '';
  selectedCategory = '';

  constructor(
    private jobService: JobService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {

    this.jobService.getJobs().subscribe({

      next: (data: Job[]) => {

        console.log('JOBS RECEIVED:', data);

        this.jobs = [...data];

        // Update screen immediately
        this.cdr.detectChanges();

      },

      error: (error: any) => {

        console.error(
          'JOB API ERROR:',
          error
        );

        this.jobs = [];

        this.cdr.detectChanges();

      }

    });

  }

  get filteredJobs(): Job[] {

    const search =
      this.searchText
        .trim()
        .toLowerCase();

    const location =
      this.selectedLocation
        .trim()
        .toLowerCase();

    const category =
      this.selectedCategory
        .trim()
        .toLowerCase();

    return this.jobs.filter((job: Job) => {

      const title =
        (job.title || '')
          .trim()
          .toLowerCase();

      const company =
        (job.company || '')
          .trim()
          .toLowerCase();

      const jobLocation =
        (job.location || '')
          .trim()
          .toLowerCase();

      const jobCategory =
        (job.category || '')
          .trim()
          .toLowerCase();

      const matchesSearch =
        !search ||
        title.includes(search) ||
        company.includes(search) ||
        jobLocation.includes(search) ||
        jobCategory.includes(search);

      const matchesLocation =
        !location ||
        jobLocation.includes(location);

      const matchesCategory =
        !category ||
        jobCategory.includes(category);

      return (
        matchesSearch &&
        matchesLocation &&
        matchesCategory
      );

    });

  }

  clearFilters(): void {

    this.searchText = '';
    this.selectedLocation = '';
    this.selectedCategory = '';

    this.cdr.detectChanges();

  }

}