import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

const appRoutes: Routes = [
  {
    path: 'workout/:id',
    component: AppComponent,
  },
  {
    path: 'workouts',
    component: AppComponent,
  },
  {
    path: '',
    redirectTo: '/workouts',
    pathMatch: 'full',
  },
  { path: '**', component: AppComponent },
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
