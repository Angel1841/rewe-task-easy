import { Routes } from '@angular/router';
import { LoginComponent } from './features/login.component';
import { DashboardComponent } from './features/dashboard.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  { path: 'login', component: LoginComponent },
  { path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],  },
  { path: '**', redirectTo: 'login' },];
