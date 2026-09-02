import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {

  _id?: string;

  name: string;
  email: string;

  password?: string;

  role?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl =
    'https://jobhub-job-portal.onrender.com/api/users';

  constructor(
    private http: HttpClient
  ) {}

  register(user: User): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/register`,
      user
    );

  }

  login(
    data: {
      email: string;
      password: string;
    }
  ): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/login`,
      data
    );

  }

}