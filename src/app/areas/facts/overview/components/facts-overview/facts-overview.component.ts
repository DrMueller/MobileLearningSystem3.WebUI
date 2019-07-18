import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FactOverviewEntryDataService } from 'src/app/areas/shared-domain/services';
import { Enquiry, QuestionResult } from 'src/app/infrastructure/shared-features/enquiry-dialog/model';
import { EnquiryService } from 'src/app/infrastructure/shared-features/enquiry-dialog/services';
import { MatTableComponent } from 'src/app/infrastructure/shared-features/tables/components/mat-table';
import { ColumnDefinitionsContainer } from 'src/app/infrastructure/shared-features/tables/models';

import { FactOverviewEntry } from '../../../../shared-domain/models/fact-overview-entry.model';
import { FactsNavigationService } from '../../../common/services';
import { FactsOverviewColDefBuilderService } from '../../services';

@Component({
  selector: 'app-facts-overview',
  templateUrl: './facts-overview.component.html',
  styleUrls: ['./facts-overview.component.scss']
})
export class FactsOverviewComponent implements OnInit {
  public columnDefinitions: ColumnDefinitionsContainer;
  @ViewChild('deleteTemplate', { static: true }) public deleteTemplate: TemplateRef<any>;
  @ViewChild('editTemplate', { static: true }) public editTemplate: TemplateRef<any>;
  @ViewChild(MatTableComponent, { static: false }) public table: MatTableComponent<FactOverviewEntry>;
  public overviewEntries: FactOverviewEntry[] = [];

  public constructor(
    private colDefBuilder: FactsOverviewColDefBuilderService,
    private dataService: FactOverviewEntryDataService,
    private navigator: FactsNavigationService,
    private enquiryService: EnquiryService) { }

  public async deleteAsync(factId: string): Promise<void> {
    const factIdParsed = parseInt(factId, 10);
    await this.dataService.deleteFactAsync(factIdParsed);

    const entry = this.overviewEntries.find(f => f.id === factIdParsed)!;
    this.table.deleteEntries([entry]);
  }

  public async ngOnInit(): Promise<void> {
    this.columnDefinitions = this.colDefBuilder.buildDefinitions(this.editTemplate, this.deleteTemplate);
    this.overviewEntries = await this.dataService.loadOverviewAsync();
  }

  public createFact(): void {
    this.navigator.navigateToEdit(-1);
  }

  public async deleteAllFactsAsync(): Promise<void> {
    this.enquiryService.ask(new Enquiry('Deleting all Facts', 'Are you sure to delete all Facts?'))
      .subscribe(async qr => {
        if (qr === QuestionResult.Yes) {
          await this.dataService.deleteAllFactsAsync();
          const clonsedArray = Object.assign([], this.overviewEntries);
          this.table.deleteEntries(clonsedArray);
        }
      });
  }

  public edit(factId: string): void {
    const f = parseInt(factId, 10);
    this.navigator.navigateToEdit(f);
  }
}
