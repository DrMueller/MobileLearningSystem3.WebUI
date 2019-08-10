import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { BusyIndicatorService } from 'src/app/infrastructure/core-services/loading-indication/services';
import { SnackBarService } from 'src/app/infrastructure/core-services/snack-bar/services';
import { Enquiry, QuestionResult } from 'src/app/infrastructure/shared-features/enquiry-dialog/model';
import { EnquiryService } from 'src/app/infrastructure/shared-features/enquiry-dialog/services';
import { MatTableComponent } from 'src/app/infrastructure/shared-features/tables/components/mat-table';
import { ColumnDefinitionsContainer } from 'src/app/infrastructure/shared-features/tables/models';

import { LearningSessionsNavigationService } from '../../../common/services/learning-sessions-navigation.service';
import { LearningSessionOverviewEntry } from '../../models';
import { ChunkDefinition } from '../../models/chunk-definition.model';
import { ChunkFactoryService } from '../../services/chunk-factory.service';
import { LearningSessionsOverviewColDefBuilderService } from '../../services/learning-sessions-overview-col-def-builder.service';
import { LearningSessionsOverviewEntryDataService } from '../../services/learning-sessions-overview-entry-data.service';
import { ChunkEditDialogComponent } from '../chunk-edit-dialog/chunk-edit-dialog.component';

@Component({
  selector: 'app-learning-sessions-overview',
  templateUrl: './learning-sessions-overview.component.html',
  styleUrls: ['./learning-sessions-overview.component.scss']
})
export class LearningSessionsOverviewComponent implements OnInit {
  @ViewChild('deleteTemplate', { static: true }) public deleteTemplate: TemplateRef<any>;
  @ViewChild('editTemplate', { static: true }) public editTemplate: TemplateRef<any>;
  @ViewChild(MatTableComponent, { static: false }) public table: MatTableComponent<LearningSessionOverviewEntry>;
  public columnDefinitions: ColumnDefinitionsContainer;
  public overviewEntries: LearningSessionOverviewEntry[] = [];

  private _selectedEntry: LearningSessionOverviewEntry | undefined;

  public constructor(
    private colDefBuilder: LearningSessionsOverviewColDefBuilderService,
    private dataService: LearningSessionsOverviewEntryDataService,
    private navigator: LearningSessionsNavigationService,
    private enquiryService: EnquiryService,
    private busyIndicator: BusyIndicatorService,
    private translator: TranslateService,
    private snackBarService: SnackBarService,
    private dialog: MatDialog,
    private chunkFactory: ChunkFactoryService) { }

  public async deleteAllSessionsAsync(): Promise<void> {
    const deleteHeading = await this
      .translator
      .get('areas.learning-sessions.overview.components.learning-sessions-overview.deleteAllSessionsHeading').toPromise();
    const deleteQuestion = await this
      .translator
      .get('areas.learning-sessions.overview.components.learning-sessions-overview.deleteAllSessionsQuestion').toPromise();

    this.enquiryService.ask(new Enquiry(deleteHeading, deleteQuestion))
      .subscribe(async qr => {
        if (qr === QuestionResult.Yes) {
          await this.dataService.deleteAllSessionsAsync();
          const clonsedArray = Object.assign([], this.overviewEntries);
          this.table.deleteEntries(clonsedArray);

          const allSessionsDeleted = await this.
            translator
            .get('areas.learning-sessions.overview.components.learning-sessions-overview.allSessionsDeleted').toPromise();

          this.snackBarService.showSnackBar(allSessionsDeleted);
        }
      });
  }

  public async deleteAsync(sessionId: string): Promise<void> {
    const factIdParsed = parseInt(sessionId, 10);
    await this.dataService.deleteSessionAsync(factIdParsed);

    const entry = this.overviewEntries.find(f => f.id === factIdParsed)!;
    this.table.deleteEntries([entry]);
  }

  public async ngOnInit(): Promise<void> {
    this.busyIndicator.withBusyIndicator(async () => {
      this.columnDefinitions = await this.colDefBuilder.buildDefinitionsAsync(this.editTemplate, this.deleteTemplate);
      this.overviewEntries = await this.dataService.loadOverviewAsync();
    });
  }

  public createSession(): void {
    this.navigator.navigateToEdit(-1);
  }

  public createSessionChunks(): void {
    const config = new MatDialogConfig();
    config.disableClose = true;

    const dialogRef = this.dialog.open(ChunkEditDialogComponent, config);
    dialogRef.afterClosed().subscribe(sr => {
      this.busyIndicator.withBusyIndicator(async () => {
        const chunkDefinition = <ChunkDefinition | undefined>sr;
        if (chunkDefinition) {
          await this.chunkFactory.createChunksAsync(chunkDefinition);
          this.overviewEntries = await this.dataService.loadOverviewAsync();
          const chunksCreatedInfo = await this.
            translator.get('areas.learning-sessions.overview.components.learning-sessions-overview.chunksCreated').toPromise();
          this.snackBarService.showSnackBar(chunksCreatedInfo);
        }
      });
    });
  }

  public edit(sessionId: string): void {
    const f = parseInt(sessionId, 10);
    this.navigator.navigateToEdit(f);
  }

  public get canRunSession(): boolean {
    return !!this._selectedEntry;
  }

  public runSession(): void {
    this.navigator.navigateToSessionRun(this._selectedEntry!.id);
  }

  public selectionChanged(entries: LearningSessionOverviewEntry[]): void {
    if (entries.length > 0) {
      this._selectedEntry = entries[0];
    } else {
      this._selectedEntry = undefined;
    }
  }
}
