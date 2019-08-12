import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RxFormGroupBindingService } from 'src/app/shared/rx-forms/services';

import { LearningSessionsNavigationService } from '../../../common/services/learning-sessions-navigation.service';
import { LearningSessionEditEntry } from '../../models';
import { LearningSessionEditDataService, LearningSessionEditFormBuilderService } from '../../services';

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
    private route: ActivatedRoute,
    private formBuilder: LearningSessionEditFormBuilderService,
    private formGroupBinder: RxFormGroupBindingService,
    private dataService: LearningSessionEditDataService,
    private navigator: LearningSessionsNavigationService) { }

  public async saveAsync(): Promise<void> {
    this.formGroupBinder.bindToModel(this.formGroup, this.editEntry);
    await this.dataService.saveEntryAsync(this.editEntry);
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

    this.route.data.subscribe(data => {
      this.editEntry = <LearningSessionEditEntry>data['session'];
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
