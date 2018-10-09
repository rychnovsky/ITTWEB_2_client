import { Component, OnInit } from '@angular/core';
import { Excercise } from '../../_models/excercise.model';

@Component({
  selector: 'app-add-excercise-form',
  templateUrl: './add-excercise-form.component.html',
  styleUrls: ['./add-excercise-form.component.scss'],
})
export class AddExcerciseFormComponent implements OnInit {
  name: string;
  description: string;
  set: number;
  duration: number;

  constructor() {}

  ngOnInit() {}

  onSubmit() {
    let excercise: Excercise = new Excercise();
    excercise.name = this.name;
    excercise.description = this.description;
    excercise.set = this.set;
    excercise.duration = this.duration;
    console.log(excercise);

    // TODO : persist new excercise into db
  }
}
