import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Fact } from 'src/app/areas/facts/common/models';
import { selectAllFacts } from 'src/app/areas/facts/common/state';
import { LoadAllFactsAction } from 'src/app/areas/facts/common/state/actions';
import { selectRouteParam } from 'src/app/shell/app-state';
import { shuffleArray } from 'src/app/utils/array-utils';

import { ILearningSessionsState } from '../../../common/state';
import { LoadNextRunAction } from '../../../common/state/actions';

@Component({
  selector: 'app-session-run',
  templateUrl: './session-run.component.html',
  styleUrls: ['./session-run.component.scss']
})
export class SessionRunComponent implements OnInit, OnDestroy {
  private _allFacts: Fact[];

  private _currentIndex: number;
  private _facts: Fact[];
  private _isAnswerShown: boolean;
  private _sessionId: number;
  private _subscriptions: Subscription[];

  public constructor(
    private store: Store<ILearningSessionsState>) { }

  public get canShowNextFact(): boolean {
    return (this._currentIndex + 1) < this._facts.length;
  }

  public get canShowNextRun(): boolean {
    return this._currentIndex === this._facts.length - 1;
  }

  public get canShowPreviousFact(): boolean {
    return this._currentIndex > 0;
  }

  public get currentFact(): Fact | undefined {
    return this._facts[this._currentIndex];
  }

  public get isAnswerShown(): boolean {
    return this._isAnswerShown;
  }

  public ngOnDestroy(): void {
    this._subscriptions.forEach(subs => subs.unsubscribe());
  }

  public ngOnInit(): void {
    this.store.dispatch(new LoadAllFactsAction());

    this._subscriptions = [
      this.store.pipe(select(selectRouteParam('sessionid'))).subscribe(sessionId => {
        if (sessionId) {
          this._sessionId = parseInt(sessionId, 10);
          this.alignFacts();
        }
      }),

      this.store.pipe(select(selectAllFacts)).subscribe(facts => {
        this._allFacts = facts;
        this.alignFacts();
      })
    ];
  }

  public get runDescription(): string {
    return `${this._currentIndex + 1} / ${this._facts.length}`;
  }

  public showAnswer(): void {
    this._isAnswerShown = true;
  }

  public showNextFact(): void {
    this._currentIndex++;
  }

  public showNextRun(): void {
    this.store.dispatch(new LoadNextRunAction(this._sessionId));
  }

  public showPreviousFact(): void {
    this._currentIndex--;
  }

  public shuffle(): void {
    this._facts = shuffleArray(this._facts);
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
