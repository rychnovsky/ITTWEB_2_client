import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WorkoutsListComponent } from './workouts-list/workouts-list.component';
import { WorkoutService } from './_services/workout.service';
import { AuthInterceptor } from './_helpers/auth.interceptor';
import { AuthenticationService } from './_services/authentication.service';
import { AddWorkoutFormComponent } from './workouts-list/add-workout-form/add-workout-form.component';
import { WorkoutDetailComponent } from './workout-detail/workout-detail.component';
import { AddExcerciseFormComponent } from './workout-detail/add-excercise-form/add-excercise-form.component';
import { LoaderComponent } from './loader/loader.component';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './_services/alert.service';

@NgModule({
  declarations: [
    AppComponent,
    PageHeaderComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    WorkoutsListComponent,
    AddWorkoutFormComponent,
    WorkoutDetailComponent,
    AddExcerciseFormComponent,
    LoaderComponent,
    AlertComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule],
  providers: [
    WorkoutService,
    AuthenticationService,
    AlertService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
