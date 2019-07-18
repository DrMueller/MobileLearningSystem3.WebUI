import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryDialogComponent } from './enquiry-dialog.component';

describe('EnquiryDialogComponent', () => {
  let component: EnquiryDialogComponent;
  let fixture: ComponentFixture<EnquiryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnquiryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnquiryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
