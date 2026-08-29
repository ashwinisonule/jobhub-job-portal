import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Application {

  _id?: string;

  userId: string;

  jobId: string;
  jobTitle: string;
  company: string;

  candidateName: string;
  candidateEmail: string;

  phone: string;
  education: string;
  skills: string;
  coverLetter: string;

  status: string;

  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private apiUrl =
    'http://localhost:5000/api/applications';

  constructor(
    private http: HttpClient
  ) {}

  apply(
    application: Application
  ): Observable<Application> {

    return this.http.post<Application>(
      this.apiUrl,
      application
    );

  }

  getApplications(
    userId: string
  ): Observable<Application[]> {

    return this.http.get<Application[]>(
      `${this.apiUrl}?userId=${userId}`
    );

  }

}