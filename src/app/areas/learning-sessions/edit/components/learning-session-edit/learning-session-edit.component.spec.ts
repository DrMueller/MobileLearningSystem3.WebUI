import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningSessionEditComponent } from './learning-session-edit.component';

describe('LearningSessionEditComponent', () => {
  let component: LearningSessionEditComponent;
  let fixture: ComponentFixture<LearningSessionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningSessionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningSessionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
