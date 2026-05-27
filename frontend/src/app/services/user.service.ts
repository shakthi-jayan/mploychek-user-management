import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  constructor(private http: HttpClient) {}

  // Get all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  // Login user
  loginUser(data: { userId: string; password: string; role: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/users/login`, data);
  }

  // Add new user
  addUser(data: { userId: string; password: string; role: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/add`, data);
  }

  // Get dashboard data
  getDashboardData(): Observable<DashboardData> {
    return this.http.get<DashboardData>(`${this.apiUrl}/users/dashboard`);
  }
}
