import { Observable, of } from 'rxjs';

import { HttpBaseService } from '../http/services';

export abstract class RepositoryBaseService<T> {
  protected constructor(
    protected httpService: HttpBaseService
  ) { }

  public delete$(id: number): Observable<number> {
    return this.httpService.delete$(id);
  }

  public deleteAll$(): Observable<void> {
    return this.httpService.delete$('');
  }

  public load$(id: number, ctor: new () => T): Observable<T> {
    if (id === -1) {
      return of(new ctor());
    } else {
      return this.httpService.get$<T>(id);
    }
  }

  public loadAll$(): Observable<T[]> {
    return this.httpService.get$<T[]>('');
  }

  public save$(entry: T): Observable<T> {
    return this.httpService.put$<T>('', entry);
  }
}
