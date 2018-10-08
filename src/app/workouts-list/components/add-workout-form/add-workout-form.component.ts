import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../../../_services/workout.service';
import { Workout } from '../../../_models/workout.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-workout-form',
  templateUrl: './add-workout-form.component.html',
  styleUrls: ['./add-workout-form.component.scss'],
})
export class AddWorkoutFormComponent implements OnInit {
  newWorkoutName: string;

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {}

  onSubmit() {
    console.log(this.newWorkoutName);

    let workout: Workout = new Workout();
    workout.name = this.newWorkoutName;

    this.workoutService.create(workout).subscribe(
      data => {
        this.newWorkoutName = '';
        console.log(data);
        alert('Added');
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong, console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
          console.log(
            `Backend returned code ${err.status}, body was: ${err.error}`,
          );
        }
        return false;
      },
    );
    return false;
  }
}
