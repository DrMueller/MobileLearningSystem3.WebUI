import { Injectable } from '@angular/core';

import { LearningSessionsHttpService } from '../../common/services';
import { RunFact } from '../models';

@Injectable({
  providedIn: 'root'
})
export class RunFactDataService {
  public constructor(private httpService: LearningSessionsHttpService) { }

  public async loadRunFactsAsync(sessionId: number): Promise<RunFact[]> {
    return await this.httpService.getAsync(`${sessionId}/runfacts`);
  }
}
