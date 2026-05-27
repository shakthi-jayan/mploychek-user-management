import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { UserService } from '../../services/user.service'

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
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    this.loading = true
    this.userService.getUsers().subscribe({
      next: (response: any) => {
        console.log(response)
        this.users = response.users || response.data || response
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

    this.userService.addUser(userData).subscribe({
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
