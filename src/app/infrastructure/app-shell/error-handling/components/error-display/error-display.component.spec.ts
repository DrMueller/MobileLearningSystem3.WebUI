import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { provideMock } from 'src/app/testing-extensions/functions';

import { ErrorInformation } from '../../models';

import { ErrorDisplayComponent } from './error-display.component';

describe('ErrorDisplayComponent', () => {
  let component: ErrorDisplayComponent;
  let fixture: ComponentFixture<ErrorDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorDisplayComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        provideMock(MatDialogRef),
        { provide: MAT_DIALOG_DATA, useValue: ErrorInformation.createEmpty() },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
