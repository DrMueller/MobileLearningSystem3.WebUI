import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { LearningSessionsServicesModule } from '../../learning-sessions-services.module';
import { LearningSessionEditDataService } from '../services';
import { LearningSessionEditEntry } from '../models';

@Injectable({
    providedIn: LearningSessionsServicesModule
})
export class LearningSessionEditResolver implements Resolve<Promise<LearningSessionEditEntry>>  {
    public constructor(
        private dataService: LearningSessionEditDataService) {
    }

    public async resolve(route: ActivatedRouteSnapshot): Promise<LearningSessionEditEntry> {
        const sessionId = parseInt(route.paramMap.get('sessionid')!, 10);
        if (sessionId === -1) {
            return new LearningSessionEditEntry();
        }

        const editEntry = await this.dataService.loadEntryEditAsync(sessionId);
        return editEntry;
    }
}
