import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFactTemplateComponent } from './edit-fact-template.component';

describe('EditFactTemplateComponent', () => {
  let component: EditFactTemplateComponent;
  let fixture: ComponentFixture<EditFactTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFactTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFactTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
