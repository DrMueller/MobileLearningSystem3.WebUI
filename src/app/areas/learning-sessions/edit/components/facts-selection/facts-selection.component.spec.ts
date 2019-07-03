import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactsSelectionComponent } from './facts-selection.component';

describe('FactsSelectionComponent', () => {
  let component: FactsSelectionComponent;
  let fixture: ComponentFixture<FactsSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactsSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactsSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
