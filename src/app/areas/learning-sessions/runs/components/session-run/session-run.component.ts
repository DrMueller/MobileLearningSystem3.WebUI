import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArrayExtensions } from 'src/app/infrastructure/type-extensions';

import { RunFact } from '../../models';

@Component({
  selector: 'app-session-run',
  templateUrl: './session-run.component.html',
  styleUrls: ['./session-run.component.scss']
})
export class SessionRunComponent implements OnInit {
  private _runfacts: RunFact[] = [];
  private _selectedFactIndex: number;
  private _isAnswerShown: boolean;

  public constructor(private route: ActivatedRoute) { }

  public get canShowNextFact(): boolean {
    return this._selectedFactIndex < this._runfacts.length - 1;
  }

  public get canShowPreviousFact(): boolean {
    return this._selectedFactIndex > 0;
  }

  public get currentFact(): RunFact | undefined {
    return this._runfacts[this._selectedFactIndex];
  }

  public get isAnswerShown(): boolean {
    return this._isAnswerShown;
  }

  public showAnswer(): void {
    this._isAnswerShown = true;
  }

  public ngOnInit(): void {
    this.route.data.subscribe(data => {
      const runFacts = <RunFact[]>data['runfacts'];
      this._runfacts = ArrayExtensions.shuffleEntries(runFacts);
      this._selectedFactIndex = 0;
    });
  }

  public get runStateDescription(): string {
    return `${this._selectedFactIndex + 1} / ${this._runfacts.length}`;
  }

  public showNextFact(): void {
    this._isAnswerShown = false;
    this._selectedFactIndex += 1;
  }

  public showPreviousFact(): void {
    this._isAnswerShown = false;
    this._selectedFactIndex -= 1;
  }
}
