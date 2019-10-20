import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RxFormGroupBindingService } from 'src/app/shared/rx-forms/services';
import { IAppState } from 'src/app/shell/app-state';

import { LoginRequest } from '../../models';
import { LogInFormBuilderService } from '../../services';
import { LogInAction } from '../../state/actions';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  public formGroup: FormGroup;
  public isLoggingIn = false;

  public constructor(
    private formGroupBinder: RxFormGroupBindingService,
    private formBuilder: LogInFormBuilderService,
    private router: Router,
    private store: Store<IAppState>) { }

  public ngOnInit(): void {
    this.formGroup = this.formBuilder.buildFormGroup();
  }

  public logIn(): void {
    this.isLoggingIn = true;
    const request = new LoginRequest();
    this.formGroupBinder.bindToModel(this.formGroup, request);
    this.store.dispatch(new LogInAction(request));
    this.isLoggingIn = false;
    this.router.navigate(['home']);
  }

  public get canLogIn(): boolean {
    return !this.formGroup.invalid && !this.isLoggingIn;
  }
}
