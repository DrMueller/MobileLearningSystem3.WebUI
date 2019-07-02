import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { provideMock, provideMockInstance, spyOnClass } from 'src/app/testing-extensions/functions';
import { SpyOf } from 'src/app/testing-extensions/types';

import { SecurityUser } from '../../models';
import { AuthenticationService, SecurityUserSingletonService } from '../../services';

import { UserMenuComponent } from './user-menu.component';

describe('UserMenuComponent', () => {
  let component: UserMenuComponent;
  let fixture: ComponentFixture<UserMenuComponent>;
  let securityUserSingletonMock: SpyOf<SecurityUserSingletonService>;

  beforeEach(() => {
    securityUserSingletonMock = spyOnClass(SecurityUserSingletonService);
    (<any>securityUserSingletonMock).instance = SecurityUser.createUnauthenticated();
    (<any>securityUserSingletonMock.userChanged$) = new BehaviorSubject<SecurityUser>(SecurityUser.createUnauthenticated());
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserMenuComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        provideMock(AuthenticationService),
        provideMockInstance(SecurityUserSingletonService, securityUserSingletonMock)
      ],
      imports: [
        MatMenuModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
