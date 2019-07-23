import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormGroupBindingService } from 'src/app/infrastructure/shared-features/rx-forms/services';

import { FactsNavigationService } from '../../../common/services';
import { FactEditEntry } from '../../models';
import { FactEditDataService, FactEditFormBuilderService } from '../../services';

@Component({
  selector: 'app-fact-edit',
  templateUrl: './fact-edit.component.html',
  styleUrls: ['./fact-edit.component.scss']
})
export class FactEditComponent implements OnInit {
  public editEntry: FactEditEntry;
  public formGroup: FormGroup;
  @ViewChild('autosize', { static: false }) public autosize: CdkTextareaAutosize;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FactEditFormBuilderService,
    private formGroupBinder: RxFormGroupBindingService,
    private dataService: FactEditDataService,
    private navigator: FactsNavigationService) { }

  public ngOnInit(): void {
    this.formGroup = this.formBuilder.buildFormGroup();

    this.route.data.subscribe(data => {
      this.editEntry = <FactEditEntry>data['fact'];
      this.formGroupBinder.bindToFormGroup(this.editEntry, this.formGroup);
    });
  }

  public get title(): string {
    if (this.editEntry.id) {
      return `Edit Fact - ${this.editEntry.id}`;
    }

    return 'New Fact';
  }

  public get canCopySavedFact(): boolean {
    return !!this.editEntry.id;
  }

  public get canSave(): boolean {
    return this.formGroup.valid;
  }

  public cancel(): void {
    this.navigator.navigateToOverview();
  }

  public copySavedFact(): void {
    this.navigator.navigateToEdit(this.editEntry.id!, true);
  }

  public async saveAsync(): Promise<void> {
    this.formGroupBinder.bindToModel(this.formGroup, this.editEntry);
    await this.dataService.saveEntryAsync(this.editEntry);
    this.navigator.navigateToOverview();
  }
}
