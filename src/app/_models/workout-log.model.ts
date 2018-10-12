import { Workout } from './workout.model';

export class WorkoutLog {
  date: Date;
  workout: Workout;
  constructor(workout: Workout) {
    this.workout = workout;
  }
}
