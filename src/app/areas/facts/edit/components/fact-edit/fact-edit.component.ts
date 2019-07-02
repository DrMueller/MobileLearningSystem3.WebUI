import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FactEditEntry } from '../../models';
import { FactEditFormBuilderService } from '../../services';
import { FormGroup } from '@angular/forms';
import { RxFormGroupBindingService } from 'src/app/infrastructure/shared-features/rx-forms/services';

@Component({
  selector: 'app-fact-edit',
  templateUrl: './fact-edit.component.html',
  styleUrls: ['./fact-edit.component.scss']
})
export class FactEditComponent implements OnInit {
  public editEntry: FactEditEntry;
  public formGroup: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FactEditFormBuilderService,
    private formGroupBinder: RxFormGroupBindingService) { }

  public ngOnInit(): void {
    this.formGroup = this.formBuilder.buildFormGroup();

    this.route.data.subscribe(data => {
      this.editEntry = <FactEditEntry>data['fact'];
      this.formGroupBinder.bindToFormGroup(this.editEntry, this.formGroup);
    });
  }
}
