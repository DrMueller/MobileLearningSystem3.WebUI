import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { RxFormGroupBindingService } from 'src/app/infrastructure/shared-features/rx-forms/services';

import { ChunkDefinition } from '../../models/chunk-definition.model';
import { ChunkNameFormBuilderService } from '../../services/chunk-name-form-builder.service';

@Component({
  selector: 'app-chunk-edit-dialog',
  templateUrl: './chunk-edit-dialog.component.html',
  styleUrls: ['./chunk-edit-dialog.component.scss']
})
export class ChunkEditDialogComponent implements OnInit {
  public formGroup: FormGroup;

  public constructor(
    public dialogRef: MatDialogRef<ChunkEditDialogComponent>,
    private formBuilder: ChunkNameFormBuilderService,
    private formGroupBinder: RxFormGroupBindingService) { }

  public ngOnInit() {
    this.formGroup = this.formBuilder.buildFormGroup();
  }

  public get canSave(): boolean {
    return this.formGroup.valid;
  }

  public cancel(): void {
    this.dialogRef.close(undefined);
  }

  public save(): void {
    const chunkDefinition = new ChunkDefinition();
    this.formGroupBinder.bindToModel(this.formGroup, chunkDefinition);
    this.dialogRef.close(chunkDefinition);
  }
}
