import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Job {
  _id?: string;
  title: string;
  company: string;
  location: string;
  category: string;
  salary: string;
  jobType: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private apiUrl = 'https://jobhub-job-portal.onrender.com/api/jobs';

  constructor(private http: HttpClient) {}

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.apiUrl);
  }

  getJobById(id: string): Observable<Job> {
    return this.http.get<Job>(`${this.apiUrl}/${id}`);
  }

  addJob(job: Job): Observable<Job> {
  return this.http.post<Job>(
    this.apiUrl,
    job
  );
}

}
