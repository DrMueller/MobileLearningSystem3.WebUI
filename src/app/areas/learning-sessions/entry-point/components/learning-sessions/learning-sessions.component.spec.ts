import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningSessionsComponent } from './learning-sessions.component';

describe('LearningSessionsComponent', () => {
  let component: LearningSessionsComponent;
  let fixture: ComponentFixture<LearningSessionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningSessionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
