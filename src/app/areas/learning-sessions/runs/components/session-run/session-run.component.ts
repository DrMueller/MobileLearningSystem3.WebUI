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

  public constructor(private route: ActivatedRoute) { }

  public get canShowNextFact(): boolean {
    return this._selectedFactIndex < (this._runfacts.length - 1);
  }

  public get canShowPreviousFact(): boolean {
    return this._selectedFactIndex > 0;
  }

  public get currentFact(): RunFact {
    return this._runfacts[this._selectedFactIndex];
  }

  public ngOnInit(): void {
    this.route.data.subscribe(data => {
      const runFacts = <RunFact[]>data['runfacts'];
      this._runfacts = ArrayExtensions.shuffleEntries(runFacts);
    });
  }

  public runStateDescription(): string {
    return `${this._selectedFactIndex} / ${this._runfacts.length}`;
  }

  public showNextFact(): void {
    this._selectedFactIndex += 1;
  }

  public showPrevioisFact(): void {
    this._selectedFactIndex -= 1;
  }
}
