import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  @Output()
  dismissError: EventEmitter<any> = new EventEmitter();
  @Input()
  type: string;
  @Input()
  message: string;

  constructor() {}

  ngOnInit() {
    setTimeout(() => this.dismissAlert(), 3000);
  }

  dismissAlert() {
    this.dismissError.emit();
  }
}
