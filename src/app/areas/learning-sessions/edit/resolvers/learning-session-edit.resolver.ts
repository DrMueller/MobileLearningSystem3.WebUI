import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { LearningSessionEditEntry } from 'src/app/areas/shared-domain/models';
import { LearningSessionRepositoryService } from 'src/app/areas/shared-domain/repos';

import { LearningSessionsServicesModule } from '../../learning-sessions-services.module';

@Injectable({
    providedIn: LearningSessionsServicesModule
})
export class LearningSessionEditResolver implements Resolve<Promise<LearningSessionEditEntry>>  {
    public constructor(
        private learningSessionRepo: LearningSessionRepositoryService) {
    }

    public async resolve(route: ActivatedRouteSnapshot): Promise<LearningSessionEditEntry> {
        const sessionId = parseInt(route.paramMap.get('sessionid')!, 10);
        if (sessionId === -1) {
            return new LearningSessionEditEntry();
        }

        const editEntry = await this.learningSessionRepo.loadEditEntryAsync(sessionId);
        return editEntry;
    }
}
