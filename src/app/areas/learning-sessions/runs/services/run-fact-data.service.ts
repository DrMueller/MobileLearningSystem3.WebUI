import { Injectable } from '@angular/core';

import { LearningSessionsHttpService } from '../../common/services';
import { LearningSessionsServicesModule } from '../../learning-sessions-services.module';
import { RunFact } from '../models';

@Injectable({
  providedIn: LearningSessionsServicesModule
})
export class RunFactDataService {
  public constructor(private httpService: LearningSessionsHttpService) { }

  public async loadRunFactsAsync(sessionId: number): Promise<RunFact[]> {
    return await this.httpService.getAsync(`${sessionId}/runfacts`);
  }
}
