import { CommonModule } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard implements OnInit {
  users: any[] = []
  loading = false
  userId = ''
  password = ''
  role = 'General User'

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    this.loading = false;
    this.http.get<any[]>(`${environment.apiUrl}/users`).subscribe({
      next: (response) => {
        console.log(response)
        this.users = response
        this.loading = false
      },
      error: (error) => {
        console.log(error)
        this.loading = false
      }
    })
  }

  addUser() {
    const userData = {
      userId: this.userId,
      password: this.password,
      role: this.role
    }

    this.http.post(`${environment.apiUrl}/users/add`, userData).subscribe({
      next: (response) => {
        console.log(response)
        alert('User Added')
        this.userId = ''
        this.password = ''
        this.role = 'General User'
        this.getUsers()
      },
      error: (error) => {
        console.log(error)
        alert('Error Adding User')
      }
    })
  }

  logout() {
    localStorage.removeItem('user')
    this.router.navigate(['/'])
  }
}
