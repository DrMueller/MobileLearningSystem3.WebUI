import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FactEditEntry } from 'src/app/areas/shared-domain/models/fact-edit-entry.model';
import { FactRepositoryService } from 'src/app/areas/shared-domain/repos/fact-repository.service';
import { RxFormGroupBindingService } from 'src/app/shared/rx-forms/services';

import { FactsNavigationService } from '../../../common/services';
import { FactEditFormBuilderService } from '../../services';

@Component({
  selector: 'app-fact-edit',
  templateUrl: './fact-edit.component.html',
  styleUrls: ['./fact-edit.component.scss']
})
export class FactEditComponent implements OnInit {
  public fact: FactEditEntry;
  public formGroup: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FactEditFormBuilderService,
    private formGroupBinder: RxFormGroupBindingService,
    private factRepo: FactRepositoryService,
    private navigator: FactsNavigationService) { }

  public ngOnInit(): void {
    this.formGroup = this.formBuilder.buildFormGroup();

    this.route.data.subscribe(data => {
      this.fact = <FactEditEntry>data['fact'];
      this.formGroupBinder.bindToFormGroup(this.fact, this.formGroup);
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

  public async saveAsync(): Promise<void> {
    this.formGroupBinder.bindToModel(this.formGroup, this.fact);
    await this.factRepo.saveEditEntryAsync(this.fact);
    this.navigator.navigateToOverview();
  }
}
