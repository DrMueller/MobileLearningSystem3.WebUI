import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IFactsState, selecetOverview } from 'src/app/areas/facts/common/state';
import { LoadFactsOverviewAction } from 'src/app/areas/facts/common/state/actions';
import { FactOverviewEntry } from 'src/app/areas/shared-domain/models';
import { MatTableComponent } from 'src/app/shared/tables/components/mat-table';
import { ColumnDefinitionsContainer } from 'src/app/shared/tables/models';

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
  @ViewChild('existsInRunTemplate', { static: true }) public existsInRunTemplate: TemplateRef<any>;
  public overviewEntries: FactOverviewEntry[] = [];

  private _selectedFactIds: number[];

  public constructor(
    private store: Store<IFactsState>,
    private colDefBuilder: FactsSelectionColDefBuilderService) { }

  public async ngOnInit(): Promise<void> {
    this.store
      .pipe(select(selecetOverview))
      .subscribe(sr => this.overviewEntries = sr);

    this.store.dispatch(new LoadFactsOverviewAction());

    this.columnDefinitions = this.colDefBuilder.buildDefinitions(this.existsInRunTemplate);
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
