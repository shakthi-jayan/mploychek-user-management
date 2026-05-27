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
  errorMessage = ''
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
    this.errorMessage = ''
    this.userService.getUsers().subscribe({
      next: (response) => {
        this.users = Array.isArray(response) ? response : []
        this.loading = false
      },
      error: (error) => {
        console.error('Failed to fetch users:', error)
        this.errorMessage = 'Failed to load users. Please try again.'
        this.loading = false
      }
    })
  }

  addUser() {
    if (!this.userId.trim() || !this.password.trim()) {
      alert('User ID and Password are required.')
      return
    }

    const userData = {
      userId: this.userId.trim(),
      password: this.password.trim(),
      role: this.role
    }

    this.userService.addUser(userData).subscribe({
      next: (response) => {
        console.log('User added:', response)
        alert('User Added Successfully')
        this.userId = ''
        this.password = ''
        this.role = 'General User'
        this.getUsers()
      },
      error: (error) => {
        console.error('Add user error:', error)
        alert(error?.error?.message || 'Error Adding User')
      }
    })
  }

  logout() {
    localStorage.removeItem('user')
    this.router.navigate(['/'])
  }
}
