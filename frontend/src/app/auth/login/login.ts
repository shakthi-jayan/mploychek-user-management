import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { UserService } from '../../services/user.service'

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
    private userService: UserService,
    private router: Router
  ) {}

  login() {
    this.loading = true

    this.userService.loginUser({
      userId: this.userId,
      password: this.password,
      role: this.role
    }).subscribe({
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
