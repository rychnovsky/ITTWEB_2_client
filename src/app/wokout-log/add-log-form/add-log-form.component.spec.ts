/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddLogFormComponent } from './add-log-form.component';

describe('AddExcerciseFormComponent', () => {
  let component: AddLogFormComponent;
  let fixture: ComponentFixture<AddLogFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddLogFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
