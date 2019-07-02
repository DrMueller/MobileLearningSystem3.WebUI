import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactsOverviewComponent } from './facts-overview.component';

describe('FactsOverviewComponent', () => {
  let component: FactsOverviewComponent;
  let fixture: ComponentFixture<FactsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactsOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
