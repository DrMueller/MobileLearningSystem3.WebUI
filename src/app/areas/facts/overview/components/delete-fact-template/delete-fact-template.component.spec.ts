import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFactTemplateComponent } from './delete-fact-template.component';

describe('DeleteFactTemplateComponent', () => {
  let component: DeleteFactTemplateComponent;
  let fixture: ComponentFixture<DeleteFactTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteFactTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteFactTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
