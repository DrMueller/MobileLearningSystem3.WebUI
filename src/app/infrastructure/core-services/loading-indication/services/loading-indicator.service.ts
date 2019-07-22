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

  public async withLoadingIndicator<T>(callback: () => Promise<T>): Promise<T> {
    try {
      setTimeout(() => this._showLoadingIndicator.next(true));
      return await callback();
    } finally {
      setTimeout(() => this._showLoadingIndicator.next(false));
    }
  }
}
