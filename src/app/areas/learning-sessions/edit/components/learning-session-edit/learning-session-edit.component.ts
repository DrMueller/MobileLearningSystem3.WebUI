import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LearningSession } from 'src/app/areas/shared-domain/models';
import { RxFormGroupBindingService } from 'src/app/shared/rx-forms/services';

import { LearningSessionsNavigationService } from '../../../common/services/learning-sessions-navigation.service';
import {  ILearningSessionsState } from '../../../common/state';
import { SaveLearningSessionAction } from '../../../common/state/actions';
import { LearningSessionEditFormBuilderService } from '../../services';


@Component({
  selector: 'app-learning-session-edit',
  templateUrl: './learning-session-edit.component.html',
  styleUrls: ['./learning-session-edit.component.scss']
})
export class LearningSessionEditComponent implements OnInit {
  public learningSession: LearningSession;
  public formGroup: FormGroup;
  public initiallySelectedFactIds: number[] = [];

  public constructor(
    private formBuilder: LearningSessionEditFormBuilderService,
    private formGroupBinder: RxFormGroupBindingService,
    private navigator: LearningSessionsNavigationService,
    private store: Store<ILearningSessionsState>) { }

  public save(): void {
    this.formGroupBinder.bindToModel(this.formGroup, this.learningSession);
    this.store.dispatch(new SaveLearningSessionAction(this.learningSession));
    this.navigator.navigateToOverview();
  }

  public get canSave(): boolean {
    return this.formGroup.valid;
  }

  public cancel(): void {
    this.navigator.navigateToOverview();
  }

  public factsSelectionChanged(factIds: number[]) {
    this.learningSession.factIds = factIds;
  }

  public ngOnInit(): void {
    this.formGroup = this.formBuilder.buildFormGroup();

    // this.store
    //   .pipe(select(selectRouteParam('sessionid')))
    //   .subscribe(sessionId => {
    //     if (sessionId) {
    //       this.store.dispatch(new LoadEditSessionAction(parseInt(sessionId, 10)));
    //     }
    //   });

    // this.store
    //   .pipe(select(getCurrentSession))
    //   .subscribe(sr => {
    //     this.learningSession = sr;
    //     this.learningSession.factIds.forEach(factId => this.initiallySelectedFactIds.push(factId));
    //     this.formGroupBinder.bindToFormGroup(this.learningSession, this.formGroup);
    //   });
  }

  public get title(): string {
    if (this.learningSession.id) {
      return `Edit Session - ${this.learningSession.id}`;
    }

    return 'New Session';
  }
}
