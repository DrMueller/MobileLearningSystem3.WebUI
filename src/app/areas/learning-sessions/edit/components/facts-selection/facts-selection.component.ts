import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { Fact } from 'src/app/areas/shared-domain/models';
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
  @ViewChild('existsInRunTemplate', { static: true }) public existsInRunTemplate: TemplateRef<any>;
  @ViewChild(MatTableComponent, { static: false }) public table: MatTableComponent<Fact>;
  public columnDefinitions: ColumnDefinitionsContainer;
  private _facts: Fact[] = [];

  private _selectedFactIds: number[];

  public constructor(
    private colDefBuilder: FactsSelectionColDefBuilderService) { }

  @Input() public set selectedFactIds(value: number[]) {
    this._selectedFactIds = value;
    this.selectIfReady();
  }

  public get facts(): Fact[] {
    return this._facts;
  }

  @Input() public set facts(value: Fact[]) {
    this._facts = value;
    this.selectIfReady();
  }

  public async ngOnInit(): Promise<void> {
    this.columnDefinitions = this.colDefBuilder.buildDefinitions(this.existsInRunTemplate);
    this.selectIfReady();
  }

  public selectionChanged(facts: Fact[]) {
    const ids = facts.map(f => f.id!);
    this.factsSelectionChanged.emit(ids);
  }

  private selectIfReady(): void {
    if (this.table && this._selectedFactIds && this.facts) {
      this.facts
        .filter(f => this._selectedFactIds.indexOf(f.id!) > -1)
        .forEach(f => this.table.selectRow(f));
    }
  }
}
