import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { FactEditEntry } from 'src/app/areas/shared-domain/models/fact-edit-entry.model';
import { RxFormGroupBindingService } from 'src/app/shared/rx-forms/services';
import { selectQueryParam, selectRouteParam } from 'src/app/shell/app-state';

import { FactsNavigationService } from '../../../common/services';
import { IFactsState, selectDetails } from '../../../common/state';
import { SaveFactDetailsAction } from '../../../common/state/actions';
import { LoadFactDetailsAction } from '../../../common/state/actions/load-fact-details.action';
import { FactEditFormBuilderService } from '../../services';

@Component({
  selector: 'app-fact-edit',
  templateUrl: './fact-edit.component.html',
  styleUrls: ['./fact-edit.component.scss']
})
export class FactEditComponent implements OnInit {
  public fact: FactEditEntry;
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
      .pipe(select(selectDetails))
      .subscribe(sr => {
        this.fact = sr;
        this.formGroupBinder.bindToFormGroup(this.fact, this.formGroup);
      });

    this.store
      .pipe(select(selectRouteParam('factid')))
      .subscribe(factid => {
        if (factid) {
          this.store.dispatch(new LoadFactDetailsAction(parseInt(factid, 10)));
        }
      });

    this.store
      .pipe(select(selectQueryParam('createCopy')))
      .subscribe(createCopy => {
        if (createCopy) {
          this._createCopy = createCopy === 'true';
        }
      });
  }

  public get title(): string {
    if (this.fact.id) {
      return `Edit Fact - ${this.fact.id}`;
    }

    return 'New Fact';
  }

  public get canCopySavedFact(): boolean {
    return !!this.fact.id;
  }

  public get canSave(): boolean {
    return this.formGroup.valid;
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

    this.store.dispatch(new SaveFactDetailsAction(this.fact));
    this.navigator.navigateToOverview();
  }
}
