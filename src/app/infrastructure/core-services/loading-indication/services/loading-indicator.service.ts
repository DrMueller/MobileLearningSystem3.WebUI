import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingIndicatorService {
  private _showLoadingIndicator: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public get showLoadingIndicator$(): Observable<boolean> {
    return this._showLoadingIndicator;
  }

  public toggleLoadingIndicator(show: boolean): void {
    setTimeout(() => this._showLoadingIndicator.next(show));
  }
}
