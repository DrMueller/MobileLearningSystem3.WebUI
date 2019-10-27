import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Fact } from 'src/app/areas/shared-domain/models';
import { RxFormGroupBindingService } from 'src/app/shared/rx-forms/services';
import { selectQueryParam, selectRouteParam } from 'src/app/shell/app-state';

import { FactsNavigationService } from '../../../common/services';
import { IFactsState, selectCurrentFact } from '../../../common/state';
import { LoadFactAction } from '../../../common/state/actions/load-fact.action';
import { SaveFactAction } from '../../../common/state/actions/save-faction.action';
import { FactEditFormBuilderService } from '../../services';

@Component({
  selector: 'app-fact-edit',
  templateUrl: './fact-edit.component.html',
  styleUrls: ['./fact-edit.component.scss']
})
export class FactEditComponent implements OnInit {

  public get title(): string {
    if (this.fact.id) {
      return `Edit Fact - ${this.fact.id}`;
    }

    return 'New Fact';
  }

  public get canCopySavedFact(): boolean {
    return !!this.fact && !!this.fact.id;
  }

  public get canSave(): boolean {
    return this.formGroup.valid;
  }

  public fact: Fact;
  public formGroup: FormGroup;
  private _createCopy: boolean;

  constructor(
    private store: Store<IFactsState>,
    private formBuilder: FactEditFormBuilderService,
    private formGroupBinder: RxFormGroupBindingService,
    private navigator: FactsNavigationService) { }

  public ngOnInit(): void {
    this.formGroup = this.formBuilder.buildFormGroup();

    this.store
      .pipe(select(selectCurrentFact))
      .subscribe(fact => {
        if (fact) {
          this.fact = fact;
          this.formGroupBinder.bindToFormGroup(fact, this.formGroup);
        }
      });

    this.store
      .pipe(select(selectRouteParam('factid')))
      .subscribe(factId => {
        this.store.dispatch(new LoadFactAction(parseInt(factId!, 10)));
      });

    this.store
      .pipe(select(selectQueryParam('createCopy')))
      .subscribe(createCopy => {
        if (createCopy) {
          this._createCopy = createCopy === 'true';
        }
      });
  }

  public cancel(): void {
    this.navigator.navigateToOverview();
  }

  public copySavedFact(): void {
    this.navigator.navigateToEdit(this.fact.id!, true);
  }

  public save(): void {
    this.formGroupBinder.bindToModel(this.formGroup, this.fact);

    if (this._createCopy) {
      this.fact.id = undefined;
    }

    this.store.dispatch(new SaveFactAction(this.fact));
    this.navigator.navigateToOverview();
  }
}
