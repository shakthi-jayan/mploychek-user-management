import { CommonModule } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  userId = ''
  password = ''
  role = 'General User'
  loading = false

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login() {
    this.loading = true

    const userData = {
      userId: this.userId,
      password: this.password,
      role: this.role
    }

    this.http.post<any>(`${environment.apiUrl}/users/login`, userData)
      .subscribe({
        next: (response) => {
          console.log(response)
          this.loading = false
          localStorage.setItem('user', JSON.stringify(response.user))

          if (response.user.role === 'Admin') {
            this.router.navigate(['/admin-dashboard'])
          } else {
            this.router.navigate(['/user-dashboard'])
          }
        },
        error: (error) => {
          console.log(error)
          this.loading = false
          alert('Invalid Credentials')
        }
      })
  }
}