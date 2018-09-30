import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  {
    path: 'workout/:id',
    component: AppComponent,
    data: { title: 'Workout detail' },
  },
  {
    path: 'workouts',
    component: AppComponent,
    data: { title: 'Workout list' },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Workout app login' },
  },
  {
    path: '',
    redirectTo: '/workouts',
    pathMatch: 'full',
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
