import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Enquiry, QuestionResult } from 'src/app/infrastructure/shared-features/enquiry-dialog/model';
import { EnquiryService } from 'src/app/infrastructure/shared-features/enquiry-dialog/services';
import { MatTableComponent } from 'src/app/infrastructure/shared-features/tables/components/mat-table';
import { ColumnDefinitionsContainer } from 'src/app/infrastructure/shared-features/tables/models';

import { LearningSessionsNavigationService } from '../../../common/services/learning-sessions-navigation.service';
import { LearningSessionOverviewEntry } from '../../models';
import { LearningSessionsOverviewColDefBuilderService } from '../../services/learning-sessions-overview-col-def-builder.service';
import { LearningSessionsOverviewEntryDataService } from '../../services/learning-sessions-overview-entry-data.service';

@Component({
  selector: 'app-learning-sessions-overview',
  templateUrl: './learning-sessions-overview.component.html',
  styleUrls: ['./learning-sessions-overview.component.scss']
})
export class LearningSessionsOverviewComponent implements OnInit {
  public columnDefinitions: ColumnDefinitionsContainer;
  @ViewChild('deleteTemplate', { static: true }) public deleteTemplate: TemplateRef<any>;
  @ViewChild('editTemplate', { static: true }) public editTemplate: TemplateRef<any>;
  @ViewChild(MatTableComponent, { static: false }) public table: MatTableComponent<LearningSessionOverviewEntry>;
  public overviewEntries: LearningSessionOverviewEntry[] = [];

  private _selectedEntry: LearningSessionOverviewEntry | undefined;

  public constructor(
    private colDefBuilder: LearningSessionsOverviewColDefBuilderService,
    private dataService: LearningSessionsOverviewEntryDataService,
    private navigator: LearningSessionsNavigationService,
    private enquiryService: EnquiryService) { }

  public async deleteAsync(sessionId: string): Promise<void> {
    const factIdParsed = parseInt(sessionId, 10);
    await this.dataService.deleteSessionAsync(factIdParsed);

    const entry = this.overviewEntries.find(f => f.id === factIdParsed)!;
    this.table.deleteEntries([entry]);
  }

  public async ngOnInit(): Promise<void> {
    this.columnDefinitions = this.colDefBuilder.buildDefinitions(this.editTemplate, this.deleteTemplate);
    this.overviewEntries = await this.dataService.loadOverviewAsync();
  }

  public createSession(): void {
    this.navigator.navigateToEdit(-1);
  }


  public async deleteAllSessionsAsync(): Promise<void> {
    this.enquiryService.ask(new Enquiry('Deleting all Sessions', 'Are you sure to delete all Sessions?'))
      .subscribe(async qr => {
        if (qr === QuestionResult.Yes) {
          await this.dataService.deleteAllSessionsAsync();
          const clonsedArray = Object.assign([], this.overviewEntries);
          this.table.deleteEntries(clonsedArray);
        }
      });
  }

  public edit(sessionId: string): void {
    const f = parseInt(sessionId, 10);
    this.navigator.navigateToEdit(f);
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

  public get canRunSession(): boolean {
    return !!this._selectedEntry;
  }
}
