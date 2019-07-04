import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { LearningSessionsServicesModule } from '../../learning-sessions-services.module';
import { RunFact } from '../models';
import { RunFactDataService } from '../services';

@Injectable({
    providedIn: LearningSessionsServicesModule
})
export class RunFactResolver implements Resolve<Promise<RunFact[]>>  {
    public constructor(
        private dataService: RunFactDataService) {
    }

    public async resolve(route: ActivatedRouteSnapshot): Promise<RunFact[]> {
        const sessionId = parseInt(route.paramMap.get('sessionid')!, 10);
        const runFacts = await this.dataService.loadRunFactsAsync(sessionId);
        return runFacts;
    }
}
