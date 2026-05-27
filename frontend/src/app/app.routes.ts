import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard'
import { UserDashboard } from './pages/user-dashboard/user-dashboard'

export const routes: Routes = [
  {
    path:'',
    component:Login
  },

  {
    path:'admin-dashboard',
    component:AdminDashboard
  },

  {
    path:'user-dashboard',
    component:UserDashboard
  }
]
