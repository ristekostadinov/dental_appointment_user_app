import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)},
    {path: 'register', loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent)},
    {path: 'profile', loadComponent: () => import('./components/profile/profile.component').then(m => m.ProfileComponent)},
    {path: 'categories/:category/locations/:location/services', loadComponent: () => import('./components/dental-services/dental-services.component').then(m => m.DentalServicesComponent)},
    {path: 'categories/:category/locations/:location/services/:service/providers', loadComponent: () => import('./components/providers/providers.component').then(m => m.ProvidersComponent)},
];