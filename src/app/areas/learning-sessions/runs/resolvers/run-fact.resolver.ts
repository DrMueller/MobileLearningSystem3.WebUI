import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { RunFact } from 'src/app/areas/shared-domain/models';
import { LearningSessionRepositoryService } from 'src/app/areas/shared-domain/repos';

import { LearningSessionsServicesModule } from '../../learning-sessions-services.module';

@Injectable({
    providedIn: LearningSessionsServicesModule
})
export class RunFactResolver implements Resolve<Promise<RunFact[]>>  {
    public constructor(
        private learningSessionRepo: LearningSessionRepositoryService) {
    }

    public async resolve(route: ActivatedRouteSnapshot): Promise<RunFact[]> {
        const sessionId = parseInt(route.paramMap.get('sessionid')!, 10);
        const runFacts = await this.learningSessionRepo.loadRunFactsAsync(sessionId);
        return runFacts;
    }
}
