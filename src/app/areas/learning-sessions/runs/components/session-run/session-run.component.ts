import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RunFact } from 'src/app/areas/shared-domain/models';
import { ArrayExtensions } from 'src/app/utils';

import { RunNavigationService } from '../../services';

@Component({
  selector: 'app-session-run',
  templateUrl: './session-run.component.html',
  styleUrls: ['./session-run.component.scss']
})
export class SessionRunComponent implements OnInit, OnDestroy {
  private _runFacts: RunFact[] = [];
  private _selectedFactIndex: number;
  private _isAnswerShown: boolean;
  private _sessionId: number;
  private _sessionIdSubs: Subscription;
  private _runFactsSubs: Subscription;

  public constructor(
    private route: ActivatedRoute,
    private runNavigator: RunNavigationService) { }

  public get canShowNextFact(): boolean {
    return this._selectedFactIndex < this._runFacts.length - 1;
  }

  public get canShowPreviousFact(): boolean {
    return this._selectedFactIndex > 0;
  }

  public get currentFact(): RunFact | undefined {
    return this._runFacts[this._selectedFactIndex];
  }

  public get isAnswerShown(): boolean {
    return this._isAnswerShown;
  }

  public get showNavigateToNextRun(): boolean {
    return this._selectedFactIndex === this._runFacts.length - 1;
  }

  public async navigateToNextRunAsync(): Promise<void> {
    await this.runNavigator.navigateToNextRunAsync(this._sessionId);
  }

  public showAnswer(): void {
    this._isAnswerShown = true;
  }

  public ngOnDestroy(): void {
    this._sessionIdSubs.unsubscribe();
    this._runFactsSubs.unsubscribe();
  }

  public ngOnInit(): void {
    this._runFactsSubs = this.route.data.subscribe(data => {
      this._runFacts = <RunFact[]>data['runfacts'];
      this.shuffleAndStart();
    });

    this._sessionIdSubs = this.route.paramMap.subscribe(sr => {
      this._sessionId = parseInt(sr.get('sessionid')!, 10);
    });
  }

  public get runStateDescription(): string {
    return `${this._selectedFactIndex + 1} / ${this._runFacts.length}`;
  }

  public showNextFact(): void {
    this._isAnswerShown = false;
    this._selectedFactIndex += 1;
  }

  public reShuffleRun(): void {
    this.shuffleAndStart();
  }

  public showPreviousFact(): void {
    this._isAnswerShown = false;
    this._selectedFactIndex -= 1;
  }

  private shuffleAndStart(): void {
    this._isAnswerShown = false;
    this._runFacts = ArrayExtensions.shuffleEntries(this._runFacts);
    this._selectedFactIndex = 0;
  }
}
