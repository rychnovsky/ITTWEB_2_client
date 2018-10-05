import { Excercise } from './excercise.model';

export class Workout {
  _id: number;
  name: string;
  excercises: Excercise[];
}
