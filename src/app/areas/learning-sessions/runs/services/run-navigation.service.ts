import { Injectable } from '@angular/core';
import { LearningSessionRepositoryService } from 'src/app/areas/shared-domain/repos';

import { LearningSessionsNavigationService } from '../../common/services';

@Injectable({
  providedIn: 'root'
})
export class RunNavigationService {

  constructor(
    private sessionRepo: LearningSessionRepositoryService,
    private navigator: LearningSessionsNavigationService) { }

  public async navigateToNextRunAsync(currentSessionId: number): Promise<void> {
    const nextSessionId = await this.sessionRepo.loadNextSessionIdAsync(currentSessionId);
    this.navigator.navigateToSessionRun(nextSessionId);
  }
}
