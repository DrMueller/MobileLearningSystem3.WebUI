import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Fact } from 'src/app/areas/shared-domain/models';
import { RxFormGroupBindingService } from 'src/app/shared/rx-forms/services';
import { selectQueryParam, selectRouteParam } from 'src/app/shell/app-state';

import { FactsNavigationService } from '../../../common/services';
import { IFactsState, selectFacts } from '../../../common/state';
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
    return !!this.fact.id;
  }

  public get canSave(): boolean {
    return this.formGroup.valid;
  }
  public fact: Fact;
  public formGroup: FormGroup;
  private _facts: Fact[];
  private _createCopy: boolean;

  constructor(
    private store: Store<IFactsState>,
    private formBuilder: FactEditFormBuilderService,
    private formGroupBinder: RxFormGroupBindingService,
    private navigator: FactsNavigationService) { }

  public ngOnInit(): void {
    this.formGroup = this.formBuilder.buildFormGroup();

    this.store
      .pipe(select(selectFacts))
      .subscribe(facts => {
        this._facts = facts;
      });

    this.store
      .pipe(
        select(selectRouteParam('factid')),
        map(factId => this._facts.find(f => f.id === factId)))
      .subscribe(fact => this.fact = fact!);

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
