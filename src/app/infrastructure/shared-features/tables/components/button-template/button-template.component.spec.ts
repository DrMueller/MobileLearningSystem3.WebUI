import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonTemplateComponent } from './button-template.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ButtonTemplateComponent', () => {
  let component: ButtonTemplateComponent;
  let fixture: ComponentFixture<ButtonTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonTemplateComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
