import { SelectionModel } from '@angular/cdk/collections';
import {
  Component, EventEmitter, Input, OnInit,
  Output, ViewChild
} from '@angular/core';
import { MatPaginator, MatSort, MatTable, MatTableDataSource } from '@angular/material';

import { ColumnDefinitionsContainer, TableRowSelectionType } from '../../models/index';

@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.scss']
})
export class MatTableComponent<T> implements OnInit {
  @Input() public columnDefinitions: ColumnDefinitionsContainer;
  @Input() public idSelector: keyof T;
  @Output() public selectionChanged = new EventEmitter<T[]>();
  @Input() public set data(values: T[]) {
    this._data = values;
    if (this.matTable) {
      this.bindData();
    }
  }

  @Input() public set rowSelectionType(value: TableRowSelectionType) {
    this._rowSelectionType = value;
    this.initializeDataSource();
    this.bindData();
  }

  @ViewChild(MatPaginator, { static: false }) public matPaginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) public matSort: MatSort;
  @ViewChild(MatTable, { static: false }) public matTable: MatTable<T>;

  public searchText: string;
  public selection: SelectionModel<T>;

  private _dataSource: MatTableDataSource<T>;
  private _rowSelectionType: TableRowSelectionType;
  private _data: T[];

  public get canToggleAllSelections(): boolean {
    return this._rowSelectionType === TableRowSelectionType.Multi;
  }

  public get dataSource(): MatTableDataSource<T> {
    return this._dataSource;
  }

  public get allColumnHeaders(): string[] {
    const result: string[] = [];

    if (this._rowSelectionType !== TableRowSelectionType.ReadOnly) {
      result.push('Select');
    }

    result.push(...this.columnDefinitions.allColumnKeys.map(f => f.toString()));
    return result;
  }

  public get isSelectionAllowed(): boolean {
    return this._rowSelectionType !== TableRowSelectionType.ReadOnly;
  }

  public deleteEntries(entries: T[]): void {
    entries.forEach(entry => {
      const dtoIndex = this._data.indexOf(entry);
      this._data.splice(dtoIndex, 1);
    });

    this.deSelectEntries(entries);
    this.bindData();
    this.selectionChanged.emit(this.selection.selected);
    this.matTable.renderRows();
  }

  public isRowSelected(row: T): boolean {
    return this.selection.isSelected(row);
  }

  public ngOnInit(): void {
    this.initializeDataSource();
  }

  public searchTextChanged(newSearchText: string): void {
    this.dataSource.filter = newSearchText.toLocaleLowerCase();
  }

  public toggleRowSelection(row: T): void {
    this.selection.toggle(row);
    this.selectionChanged.emit(this.selection.selected);
  }

  public toggleAllSelections(): void {
    if (this._rowSelectionType === TableRowSelectionType.Multi) {
      this._data.forEach(row => this.selection.toggle(row));
      this.selectionChanged.emit(this.selection.selected);
    }
  }

  private bindData(): void {
    this._dataSource = new MatTableDataSource<T>(this._data);
    this.dataSource.paginator = this.matPaginator;
    this.dataSource.sort = this.matSort;
  }

  private deSelectEntries(entries: T[]): void {
    if (this._rowSelectionType === TableRowSelectionType.ReadOnly) {
      return;
    }

    if (this._rowSelectionType === TableRowSelectionType.Single) {
      entries.forEach(entry => this.selection.deselect(entry));
    } else {
      this.selection.deselect(...entries);
    }
  }

  private initializeDataSource(): void {
    this.selection = new SelectionModel<T>(this._rowSelectionType === TableRowSelectionType.Multi, []);
    this._dataSource = new MatTableDataSource<T>(this._data);
  }
}
