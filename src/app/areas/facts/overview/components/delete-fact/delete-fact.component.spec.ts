import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFactComponent } from './delete-fact.component';

describe('DeleteFactComponent', () => {
  let component: DeleteFactComponent;
  let fixture: ComponentFixture<DeleteFactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteFactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteFactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
