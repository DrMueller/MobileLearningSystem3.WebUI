import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RxFormGroupBindingService } from 'src/app/shared/rx-forms/services';

import { LoginRequest } from '../../models';
import { AuthenticationService, LogInFormBuilderService } from '../../services';

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
    private authenticationService: AuthenticationService,
    private formBuilder: LogInFormBuilderService,
    private router: Router) { }

  public ngOnInit(): void {
    this.formGroup = this.formBuilder.buildFormGroup();
  }

  public async logInAsync(): Promise<void> {
    this.isLoggingIn = true;
    const request = new LoginRequest();
    this.formGroupBinder.bindToModel(this.formGroup, request);

    await this.authenticationService.logInAsync(request);
    this.isLoggingIn = false;
    this.router.navigate(['home']);
  }

  public get canLogIn(): boolean {
    return !this.formGroup.invalid && !this.isLoggingIn;
  }
}
