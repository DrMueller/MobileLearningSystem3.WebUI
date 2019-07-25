import { Injectable } from '@angular/core';

import { LearningSessionsHttpService } from '../../common/services';
import { LearningSessionsServicesModule } from '../../learning-sessions-services.module';
import { LearningSessionEditEntry } from '../models';

@Injectable({
  providedIn: LearningSessionsServicesModule
})
export class LearningSessionEditDataService {
  public constructor(private httpService: LearningSessionsHttpService) { }

  public async loadEntryEditAsync(sessionId: number): Promise<LearningSessionEditEntry> {
    const factEdit = await this.httpService.getAsync<LearningSessionEditEntry>(`edit/${sessionId}`);
    return factEdit;
  }

  public async saveEntryAsync(editEntry: LearningSessionEditEntry): Promise<void> {
    await this.httpService.putAsync('edit', editEntry);
  }
}
