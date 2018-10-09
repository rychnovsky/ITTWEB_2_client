import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { WorkoutsListComponent } from './workouts-list/workouts-list.component';
import { AuthGuard } from './_guards/auth.guard';
import { WorkoutDetailComponent } from './workout-detail/workout-detail.component';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Workout app login' },
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { title: 'Workout app register' },
  },
  {
    path: 'workout/:id',
    component: WorkoutDetailComponent,
    data: { title: 'Workout detail' },
    canActivate: [AuthGuard],
  },
  {
    path: 'workouts',
    component: WorkoutsListComponent,
    data: { title: 'Workout list' },
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: '/workouts',
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: { title: 'Workout app - page not found' },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }, // <-- debugging purposes only
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
