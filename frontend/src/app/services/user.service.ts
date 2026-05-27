import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

interface User {
  userId: string;
  password?: string;
  role: string;
}

interface LoginResponse {
  message: string;
  user: User;
}

interface DashboardData {
  totalRecords: number;
  verifiedRecords: number;
  pendingRecords: number;
  verificationRecords: any[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  private noCacheHeaders = new HttpHeaders({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache'
  });

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http
      .get<any>(
        `${this.apiUrl}/users?t=${new Date().getTime()}`,
        { headers: this.noCacheHeaders }
      )
      .pipe(
        map((response) => {
          if (Array.isArray(response)) return response;
          if (response?.users && Array.isArray(response.users)) return response.users;
          if (response?.data && Array.isArray(response.data)) return response.data;
          console.warn('Unexpected getUsers() response shape:', response);
          return [];
        })
      );
  }

  loginUser(data: { userId: string; password: string; role: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/users/login`, data);
  }

  addUser(data: { userId: string; password: string; role: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/add`, data);
  }

  getDashboardData(): Observable<DashboardData> {
    return this.http.get<DashboardData>(
      `${this.apiUrl}/users/dashboard?t=${new Date().getTime()}`,
      { headers: this.noCacheHeaders }
    );
  }
}
