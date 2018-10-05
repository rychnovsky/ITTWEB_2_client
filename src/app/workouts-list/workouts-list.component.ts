import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workouts-list',
  templateUrl: './workouts-list.component.html',
  styleUrls: ['./workouts-list.component.scss'],
})
export class WorkoutsListComponent implements OnInit {
  public workouts: Array<{ id: number; name: string }> = [];

  constructor() {
    this.workouts.push({ id: 1, name: 'test' });
    this.workouts.push({ id: 2, name: 'testfewf' });
    this.workouts.push({ id: 3, name: 'tesfewft' });
  }

  ngOnInit() {}
}
