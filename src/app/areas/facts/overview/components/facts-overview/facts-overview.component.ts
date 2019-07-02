import { Component, OnInit } from '@angular/core';
import { FactsOverviewColDefBuilderService, FactOverviewEntryDataService } from '../../services';
import { ColumnDefinitionsContainer } from 'src/app/infrastructure/shared-features/tables/models';
import { FactOverviewEntry } from '../../models/fact-overview-entry.model';
import { FactsNavigationService } from '../../../common/services';

@Component({
  selector: 'app-facts-overview',
  templateUrl: './facts-overview.component.html',
  styleUrls: ['./facts-overview.component.scss']
})
export class FactsOverviewComponent implements OnInit {
  public overviewEntries: FactOverviewEntry[] = [];
  public columnDefinitions: ColumnDefinitionsContainer;

  public constructor(
    private colDefBuilder: FactsOverviewColDefBuilderService,
    private dataService: FactOverviewEntryDataService,
    private navigationService: FactsNavigationService) { }

  public async ngOnInit(): Promise<void> {
    this.columnDefinitions = this.colDefBuilder.buildDefinitions();
    this.overviewEntries = await this.dataService.loadOverviewAsync();
  }

  public createFact(): void {
    this.navigationService.navigateToEdit(-1);
  }
}
