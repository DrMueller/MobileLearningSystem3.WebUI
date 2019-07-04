import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FactOverviewEntry } from 'src/app/areas/shared-domain/models';
import { FactOverviewEntryDataService } from 'src/app/areas/shared-domain/services';
import { MatTableComponent } from 'src/app/infrastructure/shared-features/tables/components/mat-table';
import { ColumnDefinitionsContainer } from 'src/app/infrastructure/shared-features/tables/models';

import { FactsSelectionColDefBuilderService } from '../../services';

@Component({
  selector: 'app-facts-selection',
  templateUrl: './facts-selection.component.html',
  styleUrls: ['./facts-selection.component.scss']
})
export class FactsSelectionComponent implements OnInit {
  @Output() public factsSelectionChanged = new EventEmitter<number[]>();
  public columnDefinitions: ColumnDefinitionsContainer;
  @ViewChild(MatTableComponent, { static: false }) public table: MatTableComponent<FactOverviewEntry>;
  public overviewEntries: FactOverviewEntry[] = [];

  private _selectedFactIds: number[];

  public constructor(
    private dataService: FactOverviewEntryDataService,
    private colDefBuilder: FactsSelectionColDefBuilderService) { }

  public async ngOnInit(): Promise<void> {
    this.columnDefinitions = this.colDefBuilder.buildDefinitions();
    this.overviewEntries = await this.dataService.loadOverviewAsync();
    this.toggleSelectionIfReady();
  }

  @Input() public set selectedFactIds(value: number[]) {
    this._selectedFactIds = value;
    this.toggleSelectionIfReady();
  }

  public selectionChanged(overviewEntries: FactOverviewEntry[]) {
    const ids = overviewEntries.map(f => f.id);
    this.factsSelectionChanged.emit(ids);
  }

  private toggleSelectionIfReady(): void {
    if (this.table && this._selectedFactIds) {
      const selectedOverviewEntries = this.overviewEntries.filter(f => this._selectedFactIds.indexOf(f.id) > -1);
      selectedOverviewEntries.forEach(f => this.table.toggleRowSelection(f));
    }
  }
}
