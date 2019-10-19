import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { LearningSessionEditEntry } from 'src/app/areas/shared-domain/models';
import { RxFormGroupBindingService } from 'src/app/shared/rx-forms/services';

import { LearningSessionsNavigationService } from '../../../common/services/learning-sessions-navigation.service';
import { getCurrentSession, ILearningSessionsState } from '../../../common/state';
import { SaveEditAction } from '../../../common/state/actions';
import { LearningSessionEditFormBuilderService } from '../../services';

@Component({
  selector: 'app-learning-session-edit',
  templateUrl: './learning-session-edit.component.html',
  styleUrls: ['./learning-session-edit.component.scss']
})
export class LearningSessionEditComponent implements OnInit {
  public editEntry: LearningSessionEditEntry;
  public formGroup: FormGroup;
  public initiallySelectedFactIds: number[] = [];

  public constructor(
    private formBuilder: LearningSessionEditFormBuilderService,
    private formGroupBinder: RxFormGroupBindingService,
    private navigator: LearningSessionsNavigationService,
    private store: Store<ILearningSessionsState>) { }

  public async saveAsync(): Promise<void> {
    this.formGroupBinder.bindToModel(this.formGroup, this.editEntry);
    this.store.dispatch(new SaveEditAction(this.editEntry));
    this.navigator.navigateToOverview();
  }

  public get canSave(): boolean {
    return this.formGroup.valid;
  }

  public cancel(): void {
    this.navigator.navigateToOverview();
  }

  public factsSelectionChanged(factIds: number[]) {
    this.editEntry.factIds = factIds;
  }

  public ngOnInit(): void {
    this.formGroup = this.formBuilder.buildFormGroup();

    this.store
      .pipe(select(getCurrentSession))
      .subscribe(sr => {
        this.editEntry = sr;
        this.editEntry.factIds.forEach(factId => this.initiallySelectedFactIds.push(factId));
        this.formGroupBinder.bindToFormGroup(this.editEntry, this.formGroup);
      });
  }

  public get title(): string {
    if (this.editEntry.id) {
      return `Edit Session - ${this.editEntry.id}`;
    }

    return 'New Session';
  }
}
