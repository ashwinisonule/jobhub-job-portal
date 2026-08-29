import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { HomeComponent } from './components/home/home';
import { JobListComponent } from './components/job-list/job-list';
import { JobDetailsComponent } from './components/job-details/job-details';
import { ApplyJobComponent } from './components/apply-job/apply-job';
import { ApplicationsComponent } from './components/applications/applications';
import { ProfileComponent } from './components/profile/profile';
import { CompaniesComponent } from './components/companies/companies';
import { AddJobComponent } from './components/add-job/add-job';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: 'home',
    component: HomeComponent
  },

  {
    path: 'jobs',
    component: JobListComponent
  },

  {
    path: 'job-details/:id',
    component: JobDetailsComponent
  },

  {
    path: 'apply-job/:id',
    component: ApplyJobComponent
  },

  {
    path: 'applications',
    component: ApplicationsComponent
  },

  {
    path: 'profile',
    component: ProfileComponent
  },

  {
    path: 'companies',
    component: CompaniesComponent
  },

  {
    path: 'add-job',
    component: AddJobComponent
  },

  {
    path: '**',
    redirectTo: 'home'
  }

];