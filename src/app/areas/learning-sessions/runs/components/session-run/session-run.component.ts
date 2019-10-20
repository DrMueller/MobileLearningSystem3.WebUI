import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { RunFact } from 'src/app/areas/shared-domain/models';

import { getRunFacts, getSelectedRunFact, getSelectedSession as getSelectedSessionId, ILearningSessionsState } from '../../../common/state';
import {
  LoadRunFactsAction, SelectNextRunFactAction,
  SelectNextSessionRunFactsAction, SelectPreviousRunFactAction
} from '../../../common/state/actions';
import { ReshuffleRunFacts } from '../../../common/state/actions/reshuffle-run-facts.action';

@Component({
  selector: 'app-session-run',
  templateUrl: './session-run.component.html',
  styleUrls: ['./session-run.component.scss']
})
export class SessionRunComponent implements OnInit {

  public get canShowNextFact(): boolean {
    return (this.factIndex + 1) < this._runFacts.length;
  }

  public get canShowPreviousFact(): boolean {
    return this.factIndex > 0;
  }

  public get isAnswerShown(): boolean {
    return this._isAnswerShown;
  }

  public get showNavigateToNextRun(): boolean {
    return this.factIndex === this._runFacts.length - 1;
  }

  private get factIndex(): number {
    if (!this._runFacts || !this.currentFact) {
      return 0;
    }

    return this._runFacts.findIndex(f => f.id === this.currentFact!.id);
  }

  public get runStateDescription(): string {
    return `${this.factIndex + 1} / ${this._runFacts.length}`;
  }

  public currentFact: RunFact | undefined;
  private _runFacts: RunFact[] = [];
  private _isAnswerShown: boolean;
  private _sessionId: number;

  public constructor(
    private store: Store<ILearningSessionsState>) { }

  public showNextRun(): void {
    this.store.dispatch(new SelectNextSessionRunFactsAction(this._sessionId));
  }

  public showAnswer(): void {
    this._isAnswerShown = true;
  }

  public ngOnInit(): void {
    this.store
      .pipe(select(getRunFacts))
      .subscribe(runFacts => this._runFacts = runFacts);

    this.store
      .pipe(select(getSelectedSessionId))
      .subscribe(sessionId => this._sessionId = sessionId);

    this.store
      .pipe(select(getSelectedRunFact))
      .subscribe(runFact => {
        this.currentFact = runFact;
        this._isAnswerShown = false;
      });

    this.store.dispatch(new LoadRunFactsAction(this._sessionId));
  }

  public reShuffleRun(): void {
    this.store.dispatch(new ReshuffleRunFacts());
  }

  public showNextFact(): void {
    this.store.dispatch(new SelectNextRunFactAction());
  }

  public showPreviousFact(): void {
    this.store.dispatch(new SelectPreviousRunFactAction());
  }
}
