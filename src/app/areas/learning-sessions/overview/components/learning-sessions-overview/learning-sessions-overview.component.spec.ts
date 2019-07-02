import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningSessionsOverviewComponent } from './learning-sessions-overview.component';

describe('LearningSessionsOverviewComponent', () => {
  let component: LearningSessionsOverviewComponent;
  let fixture: ComponentFixture<LearningSessionsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningSessionsOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningSessionsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
