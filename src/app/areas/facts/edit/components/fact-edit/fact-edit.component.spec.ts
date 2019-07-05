import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { of } from 'rxjs';
import { RxFormGroupBindingService } from 'src/app/infrastructure/shared-features/rx-forms/services';
import { provideMock, provideMockInstance, spyOnClass } from 'src/app/testing-extensions/functions';

import { FactsNavigationService } from '../../../common/services';
import { FactEditEntry } from '../../models';
import { FactEditDataService, FactEditFormBuilderService } from '../../services';

import { FactEditComponent } from '.';

describe('FactEditComponent', () => {
  let component: FactEditComponent;
  let fixture: ComponentFixture<FactEditComponent>;

  const data = <Data>{
    fact: new FactEditEntry()
  };

  const routeMock = spyOnClass(ActivatedRoute);
  (<any>routeMock).data = of<Data>(data);

  const formBuilderMock = spyOnClass(FactEditFormBuilderService);
  formBuilderMock.buildFormGroup.and.returnValue(new FormGroup({}));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FactEditComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        provideMockInstance(ActivatedRoute, routeMock),
        provideMockInstance(FactEditFormBuilderService, formBuilderMock),
        provideMock(RxFormGroupBindingService),
        provideMock(FactEditDataService),
        provideMock(FactsNavigationService)
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
