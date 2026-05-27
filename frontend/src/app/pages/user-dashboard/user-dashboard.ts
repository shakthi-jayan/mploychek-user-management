import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.css'
})
export class UserDashboard {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('user')
    this.router.navigate(['/'])
  }
}