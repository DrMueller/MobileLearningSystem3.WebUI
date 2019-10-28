import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { selectAllFacts } from 'src/app/areas/facts/common/state';
import { LoadAllFactsAction } from 'src/app/areas/facts/common/state/actions';
import { Fact, LearningSession } from 'src/app/areas/shared-domain/models';
import { RxFormGroupBindingService } from 'src/app/shared/rx-forms/services';
import { selectRouteParam } from 'src/app/shell/app-state';

import { LearningSessionsNavigationService } from '../../../common/services/learning-sessions-navigation.service';
import { ILearningSessionsState, selectCurrentLearningSession } from '../../../common/state';
import { SaveLearningSessionAction } from '../../../common/state/actions';
import { LoadLearningSessionAction } from '../../../common/state/actions/load-learning-session.action';
import { LearningSessionEditFormBuilderService } from '../../services';

@Component({
  selector: 'app-learning-session-edit',
  templateUrl: './learning-session-edit.component.html',
  styleUrls: ['./learning-session-edit.component.scss']
})
export class LearningSessionEditComponent implements OnInit {

  public get canSave(): boolean {
    return this.formGroup.valid;
  }

  public get title(): string {
    if (this.learningSession.id) {
      return `Edit Session - ${this.learningSession.id}`;
    }

    return 'New Session';
  }
  public learningSession: LearningSession;
  public formGroup: FormGroup;
  public initiallySelectedFactIds: number[];
  public facts: Fact[];

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

  public cancel(): void {
    this.navigator.navigateToOverview();
  }

  public factsSelectionChanged(factIds: number[]) {
    this.learningSession.factIds = factIds;
  }

  public ngOnInit(): void {
    this.store.dispatch(new LoadAllFactsAction());
    this.formGroup = this.formBuilder.buildFormGroup();

    this.store
      .pipe(select(selectRouteParam('sessionid')))
      .subscribe(sessionId => {
        if (sessionId) {
          this.store.dispatch(new LoadLearningSessionAction(parseInt(sessionId, 10)));
        }
      });

    this.store
      .pipe(select(selectAllFacts))
      .subscribe(facts => {
        this.facts = facts;
        this.alignInitialFacts();
      });

    this.store
      .pipe(select(selectCurrentLearningSession))
      .subscribe(sr => {
        if (sr) {
          this.learningSession = sr;
          this.formGroupBinder.bindToFormGroup(this.learningSession, this.formGroup);
          this.alignInitialFacts();
        }
      });

  }

  private alignInitialFacts() {
    if (this.facts && this.learningSession) {
      this.initiallySelectedFactIds = Array.from(this.learningSession.factIds);
    }
  }
}
