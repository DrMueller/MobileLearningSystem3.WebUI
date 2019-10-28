import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { SnackBarService } from 'src/app/core/snack-bar/services';
import { Enquiry, QuestionResult } from 'src/app/shared/enquiry-dialog/model';
import { EnquiryService } from 'src/app/shared/enquiry-dialog/services';
import { MatTableComponent } from 'src/app/shared/tables/components/mat-table';
import { ColumnDefinitionsContainer } from 'src/app/shared/tables/models';

import { LearningSession } from '../../../common/models/learning-session.model';
import { LearningSessionsNavigationService } from '../../../common/services/learning-sessions-navigation.service';
import { ILearningSessionsState } from '../../../common/state';
import {
  DeleteAllLearningSessionsAction, DeleteLearningSessionAction,
  LoadAllLearningSessionsAction
} from '../../../common/state/actions';
import { ChunkDefinition } from '../../models';
import {
  ChunkFactoryService,
  LearningSessionsOverviewColDefBuilderService,
  LearningSessionsOverviewService
} from '../../services';
import { LearningSessionOverviewVm } from '../../view-models';
import { ChunkEditDialogComponent } from '../chunk-edit-dialog';

@Component({
  selector: 'app-learning-sessions-overview',
  templateUrl: './learning-sessions-overview.component.html',
  styleUrls: ['./learning-sessions-overview.component.scss']
})
export class LearningSessionsOverviewComponent implements OnInit, OnDestroy {
  @ViewChild('deleteTemplate', { static: true }) public deleteTemplate: TemplateRef<any>;
  @ViewChild('editTemplate', { static: true }) public editTemplate: TemplateRef<any>;
  @ViewChild(MatTableComponent, { static: false }) public table: MatTableComponent<LearningSession>;
  public columnDefinitions: ColumnDefinitionsContainer;
  public overviewEntries: LearningSessionOverviewVm[] = [];

  private _overviewSubscription: Subscription;
  private _selectedSessionId: number | undefined;

  public constructor(
    private colDefBuilder: LearningSessionsOverviewColDefBuilderService,
    private navigator: LearningSessionsNavigationService,
    private enquiryService: EnquiryService,
    private translator: TranslateService,
    private snackBarService: SnackBarService,
    private dialog: MatDialog,
    private chunkFactory: ChunkFactoryService,
    private store: Store<ILearningSessionsState>,
    private overviewService: LearningSessionsOverviewService) { }

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
          this.store.dispatch(new DeleteAllLearningSessionsAction);
        }
      });
  }

  public ngOnDestroy(): void {
    this._overviewSubscription.unsubscribe();
  }

  public deleteSession(sessionId: string): void {
    this.store.dispatch(new DeleteLearningSessionAction(parseInt(sessionId, 10)));
  }

  public async ngOnInit(): Promise<void> {
    this._overviewSubscription = this.overviewService.overview$.subscribe(entries => this.overviewEntries = entries);

    this.columnDefinitions = await this.colDefBuilder.buildDefinitionsAsync(this.editTemplate, this.deleteTemplate);
    this.store.dispatch(new LoadAllLearningSessionsAction());
  }

  public createSession(): void {
    this.navigator.navigateToEdit(-1);
  }

  public createSessionChunks(): void {
    const config = new MatDialogConfig();
    config.disableClose = true;

    const dialogRef = this.dialog.open(ChunkEditDialogComponent, config);
    dialogRef.afterClosed().subscribe(async sr => {
      const chunkDefinition = <ChunkDefinition | undefined>sr;
      if (chunkDefinition) {
        this.chunkFactory.createChunks(chunkDefinition);
        const chunksCreatedInfo = await this.
          translator.get('areas.learning-sessions.overview.components.learning-sessions-overview.chunksCreated').toPromise();
        this.snackBarService.showSnackBar(chunksCreatedInfo);
      }
    });
  }

  public edit(sessionId: string): void {
    this.navigator.navigateToEdit(parseInt(sessionId, 10));
  }

  public get canRunSession(): boolean {
    return !!this._selectedSessionId;
  }

  public runSession(): void {
    this.navigator.navigateToSessionRun(this._selectedSessionId!);
  }

  public selectionChanged(learningSessions: LearningSession[]): void {
    if (learningSessions.length > 0) {
      this._selectedSessionId = learningSessions[0].id;
    } else {
      this._selectedSessionId = undefined;
    }
  }
}
