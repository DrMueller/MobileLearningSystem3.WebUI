import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FactRepositoryService } from 'src/app/areas/shared-domain/repos';
import { BusyIndicatorService } from 'src/app/core/loading-indication/services';
import { SnackBarService } from 'src/app/core/snack-bar/services';
import { Enquiry, QuestionResult } from 'src/app/shared/enquiry-dialog/model';
import { EnquiryService } from 'src/app/shared/enquiry-dialog/services';
import { MatTableComponent } from 'src/app/shared/tables/components/mat-table';
import { ColumnDefinitionsContainer } from 'src/app/shared/tables/models';

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
  @ViewChild('actions', { static: true }) public actionsTemplate: TemplateRef<any>;
  @ViewChild(MatTableComponent, { static: false }) public table: MatTableComponent<FactOverviewEntry>;
  public overviewEntries: FactOverviewEntry[] = [];

  public constructor(
    private colDefBuilder: FactsOverviewColDefBuilderService,
    private factRepo: FactRepositoryService,
    private navigator: FactsNavigationService,
    private enquiryService: EnquiryService,
    private busyIndicator: BusyIndicatorService,
    private translator: TranslateService,
    private snackBarService: SnackBarService) { }

  public async deleteAsync(factId: string): Promise<void> {
    const factIdParsed = parseInt(factId, 10);
    await this.factRepo.deleteFactAsync(factIdParsed);

    const entry = this.overviewEntries.find(f => f.id === factIdParsed)!;
    this.table.deleteEntries([entry]);
  }

  public async ngOnInit(): Promise<void> {
    this.busyIndicator.withBusyIndicator(async () => {
      this.columnDefinitions = await this.colDefBuilder.buildDefinitionsAsync(this.actionsTemplate);
      this.overviewEntries = await this.factRepo.loadOverviewAsync();
    });
  }

  public createFact(): void {
    this.navigator.navigateToEdit(-1, false);
  }

  public async deleteAllFactsAsync(): Promise<void> {
    const deleteHeading = await this.translator.get('areas.facts.overview.components.facts-overview.deleteAllFactsHeading').toPromise();
    const deleteQuestion = await this.translator.get('areas.facts.overview.components.facts-overview.deleteAllFactsQuestion').toPromise();

    this.enquiryService.ask(new Enquiry(deleteHeading, deleteQuestion))
      .subscribe(async qr => {
        if (qr === QuestionResult.Yes) {
          await this.factRepo.deleteAllFactsAsync();
          const clonsedArray = Object.assign([], this.overviewEntries);
          this.table.deleteEntries(clonsedArray);

          const allFactsDeletedInfo = await this.translator
            .get('areas.facts.overview.components.facts-overview.allFactsDeleted')
            .toPromise();
          this.snackBarService.showSnackBar(allFactsDeletedInfo);
        }
      });
  }

  public edit(factId: string): void {
    const f = parseInt(factId, 10);
    this.navigator.navigateToEdit(f, false);
  }
}
