import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectAllFacts } from 'src/app/areas/facts/common/state';
import { LoadAllFactsAction } from 'src/app/areas/facts/common/state/actions';
import { Fact } from 'src/app/areas/shared-domain/models';
import { selectRouteParam } from 'src/app/shell/app-state';
import { ArrayExtensions } from 'src/app/utils';

import { ILearningSessionsState } from '../../../common/state';
import { LoadNextRunAction } from '../../../common/state/actions';

@Component({
  selector: 'app-session-run',
  templateUrl: './session-run.component.html',
  styleUrls: ['./session-run.component.scss']
})
export class SessionRunComponent implements OnInit {

  public get canShowNextFact(): boolean {
    return (this._currentIndex + 1) < this._facts.length;
  }

  public get canShowPreviousFact(): boolean {
    return this._currentIndex > 0;
  }

  public get isAnswerShown(): boolean {
    return this._isAnswerShown;
  }

  public get canShowNextRun(): boolean {
    return this._currentIndex === this._facts.length - 1;
  }

  public get runDescription(): string {
    return `${this._currentIndex + 1} / ${this._facts.length}`;
  }

  public get currentFact(): Fact | undefined {
    return this._facts[this._currentIndex];
  }

  private _currentIndex: number;
  private _isAnswerShown: boolean;
  private _sessionId: number;
  private _allFacts: Fact[];
  private _facts: Fact[];

  public constructor(
    private store: Store<ILearningSessionsState>) { }

  public showNextRun(): void {
    this.store.dispatch(new LoadNextRunAction(this._sessionId));
  }

  public showAnswer(): void {
    this._isAnswerShown = true;
  }

  public ngOnInit(): void {
    this.store.dispatch(new LoadAllFactsAction());

    this.store.pipe(select(selectRouteParam('sessionid'))).subscribe(sessionId => {
      if (sessionId) {
        this._sessionId = parseInt(sessionId, 10);
        this.alignFacts();
      }
    });

    this.store.pipe(select(selectAllFacts)).subscribe(facts => {
      this._allFacts = facts;
      this.alignFacts();
    });
  }

  public shuffle(): void {
    this._facts = ArrayExtensions.shuffleEntries(this._facts);
  }

  public showNextFact(): void {
    this._currentIndex++;
  }

  public showPreviousFact(): void {
    this._currentIndex--;
  }

  private alignFacts(): void {
    if (this._sessionId && this._allFacts) {
      this._facts = this._allFacts.filter(f => f.learningSessionIds.includes(this._sessionId));
      if (this._facts.length > 0) {
        this.shuffle();
        this._currentIndex = 0;
      }
    }
  }
}
