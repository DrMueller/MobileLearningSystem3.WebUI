import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMock } from 'src/app/testing-extensions/functions';

import { RxFormControlValidationService } from '../../services/rx-form-control-validation.service';

import { ValidationErrorsComponent } from './validation-errors.component';

describe('ValidationErrorsComponent', () => {
  let component: ValidationErrorsComponent;
  let fixture: ComponentFixture<ValidationErrorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationErrorsComponent ],
      providers: [
        provideMock(RxFormControlValidationService)
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
