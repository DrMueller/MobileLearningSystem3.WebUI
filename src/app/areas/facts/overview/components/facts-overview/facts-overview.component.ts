import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { SnackBarService } from 'src/app/core/snack-bar/services';
import { Enquiry, QuestionResult } from 'src/app/shared/enquiry-dialog/model';
import { EnquiryService } from 'src/app/shared/enquiry-dialog/services';
import { MatTableComponent } from 'src/app/shared/tables/components/mat-table';
import { ColumnDefinitionsContainer } from 'src/app/shared/tables/models';

import { FactsNavigationService } from '../../../common/services';
import { FactsActionTypes, IFactsState } from '../../../common/state';
import { DeleteAllFactsAction, DeleteFactAction, LoadAllFactsAction } from '../../../common/state/actions';
import { FactsOverviewColDefBuilderService } from '../../services';
import { FactsOverviewService } from '../../services/facts-overview.service';
import { FactOverviewEntryVm } from '../../view-models';

@Component({
  selector: 'app-facts-overview',
  templateUrl: './facts-overview.component.html',
  styleUrls: ['./facts-overview.component.scss']
})
export class FactsOverviewComponent implements OnInit, OnDestroy {
  public columnDefinitions: ColumnDefinitionsContainer;
  @ViewChild('actions', { static: true }) public actionsTemplate: TemplateRef<any>;
  @ViewChild('deleteTemplate', { static: true }) public deleteTemplate: TemplateRef<any>;
  @ViewChild('editTemplate', { static: true }) public editTemplate: TemplateRef<any>;
  @ViewChild(MatTableComponent, { static: false }) public table: MatTableComponent<FactOverviewEntryVm>;
  public overviewEntries: FactOverviewEntryVm[] = [];

  private _subscriptions: Subscription[];

  public constructor(
    private colDefBuilder: FactsOverviewColDefBuilderService,
    private navigator: FactsNavigationService,
    private enquiryService: EnquiryService,
    private translator: TranslateService,
    private snackBarService: SnackBarService,
    private actions$: Actions,
    private factsOverviewService: FactsOverviewService,
    private store: Store<IFactsState>) { }

  public async deleteAll(): Promise<void> {
    const deleteHeading = await this.translator.get('areas.facts.overview.components.facts-overview.deleteAllFactsHeading').toPromise();
    const deleteQuestion = await this.translator.get('areas.facts.overview.components.facts-overview.deleteAllFactsQuestion').toPromise();

    this.enquiryService.ask(new Enquiry(deleteHeading, deleteQuestion))
      .subscribe(async qr => {
        if (qr === QuestionResult.Yes) {
          this.store.dispatch(new DeleteAllFactsAction());
        }
      });
  }

  public async ngOnInit(): Promise<void> {
    this._subscriptions = [
      this.factsOverviewService.overview$.subscribe(entries => this.overviewEntries = entries),

      this.actions$.pipe(
        ofType(FactsActionTypes.DeleteAllFactsSuccess)
      ).subscribe(async () => {
        const allFactsDeletedInfo = await this.translator
          .get('areas.facts.overview.components.facts-overview.allFactsDeleted')
          .toPromise();
        this.snackBarService.showSnackBar(allFactsDeletedInfo);
      })
    ];

    this.columnDefinitions = await this.colDefBuilder.buildDefinitionsAsync(this.actionsTemplate);
    this.store.dispatch(new LoadAllFactsAction());
  }

  public createFact(): void {
    this.navigator.navigateToEdit(-1, false);
  }

  public delete(factId: string): void {
    this.store.dispatch(new DeleteFactAction(parseInt(factId, 10)));
  }

  public edit(factId: string): void {
    this.navigator.navigateToEdit(parseInt(factId, 10), false);
  }

  public ngOnDestroy(): void {
    this._subscriptions.forEach(subs => subs.unsubscribe());
  }
}
