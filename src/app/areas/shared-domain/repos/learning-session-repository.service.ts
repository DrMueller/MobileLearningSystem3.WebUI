import { Injectable } from '@angular/core';

import { LearningSessionEditEntry, LearningSessionOverviewEntry, RunFact } from '../models';

import { LearningSessionsHttpService } from './http/learning-sessions-http.service';

@Injectable({
  providedIn: 'root'
})
export class LearningSessionRepositoryService {
  public constructor(private httpService: LearningSessionsHttpService) { }

  public async deleteAllAsync(): Promise<void> {
    await this.httpService.deleteAsync('');
  }

  public async deleteAsync(sessionId: number): Promise<void> {
    await this.httpService.deleteAsync(sessionId.toString());
  }

  public async loadEditEntryAsync(sessionId: number): Promise<LearningSessionEditEntry> {
    const factEdit = await this.httpService.getAsync<LearningSessionEditEntry>(`edit/${sessionId}`);
    return factEdit;
  }

  public async loadOverviewAsync(): Promise<LearningSessionOverviewEntry[]> {
    return await this.httpService.getAsync('');
  }

  public async loadRunFactsAsync(sessionId: number): Promise<RunFact[]> {
    return await this.httpService.getAsync(`${sessionId}/runfacts`);
  }

  public async loadNextSessionIdAsync(currentSessionId: number): Promise<number> {
    return await this.httpService.getAsync(`${currentSessionId}/nextid`);
  }

  public async saveEditEntryAsync(editEntry: LearningSessionEditEntry): Promise<void> {
    await this.httpService.putAsync('edit', editEntry);
  }
}
