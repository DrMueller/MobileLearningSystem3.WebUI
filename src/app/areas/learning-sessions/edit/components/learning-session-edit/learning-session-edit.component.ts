import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { LoadAllFactsAction } from 'src/app/areas/facts/common/state/actions';
import { RxFormGroupBindingService } from 'src/app/shared/rx-forms/services';
import { selectRouteParam } from 'src/app/shell/app-state';

import { LearningSession } from '../../../common/models/learning-session.model';
import { LearningSessionsNavigationService } from '../../../common/services/learning-sessions-navigation.service';
import { ILearningSessionsState, selectCurrentLearningSession } from '../../../common/state';
import { SaveLearningSessionAction } from '../../../common/state/actions';
import { LoadLearningSessionAction } from '../../../common/state/actions/load-learning-session.action';
import { LearningSessionEditFormBuilderService } from '../../services';
import { FactsSelectionEntryService } from '../../services/facts-selection-entry.service';
import { FactSelectionEntryVm } from '../../view-models';

@Component({
  selector: 'app-learning-session-edit',
  templateUrl: './learning-session-edit.component.html',
  styleUrls: ['./learning-session-edit.component.scss']
})
export class LearningSessionEditComponent implements OnInit, OnDestroy {

  public get canSave(): boolean {
    return this.formGroup.valid;
  }

  public get title(): string {
    if (!this.learningSession) {
      return '';
    }

    if (this.learningSession.id) {
      return `Edit Session - ${this.learningSession.id}`;
    }

    return 'New Session';
  }
  public learningSession: LearningSession;
  public formGroup: FormGroup;
  public initiallySelectedFactIds: number[];
  public facts: FactSelectionEntryVm[];

  private _subscriptions: Subscription[];

  public constructor(
    private formBuilder: LearningSessionEditFormBuilderService,
    private formGroupBinder: RxFormGroupBindingService,
    private navigator: LearningSessionsNavigationService,
    private store: Store<ILearningSessionsState>,
    private factsSelectionEntryService: FactsSelectionEntryService) { }

  public save(): void {
    this.formGroupBinder.bindToModel(this.formGroup, this.learningSession);
    this.store.dispatch(new SaveLearningSessionAction(this.learningSession));
    this.navigator.navigateToOverview();
  }

  public ngOnDestroy(): void {
    this._subscriptions.forEach(subs => subs.unsubscribe());
  }

  public cancel(): void {
    this.navigator.navigateToOverview();
  }

  public factsSelectionChanged(factIds: number[]) {
    this.learningSession.factIds = factIds;
  }

  public ngOnInit(): void {
    this.store.dispatch(new LoadAllFactsAction());
    this.formGroup = this.formBuilder.buildFormGroup();

    this._subscriptions = [
      this.store
        .pipe(select(selectRouteParam('sessionid')))
        .subscribe(sessionId => {
          if (sessionId) {
            this.store.dispatch(new LoadLearningSessionAction(parseInt(sessionId, 10)));
          }
        }),

      this.factsSelectionEntryService.entries$.subscribe(facts => {
        this.facts = facts;
        this.alignInitialFacts();
      }),

      this.store
        .pipe(select(selectCurrentLearningSession))
        .subscribe(sr => {
          if (sr) {
            this.learningSession = sr;
            this.formGroupBinder.bindToFormGroup(this.learningSession, this.formGroup);
            this.alignInitialFacts();
          }
        })
    ];
  }

  private alignInitialFacts() {
    if (this.facts && this.learningSession) {
      this.initiallySelectedFactIds = Array.from(this.learningSession.factIds);
    }
  }
}
