import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { FactServicesModule } from '../../fact-services.module';
import { FactEditEntry } from '../models';
import { FactEditDataService } from '../services';

@Injectable({
    providedIn: FactServicesModule
})
export class FactEditResolver implements Resolve<Promise<FactEditEntry>>  {
    public constructor(
        private dataService: FactEditDataService) {
    }

    public async resolve(route: ActivatedRouteSnapshot): Promise<FactEditEntry> {
        const factId = parseInt(route.paramMap.get('factid')!, 10);
        const createCopy = route.queryParamMap.get('createCopy') === 'true';
        if (factId === -1) {
            return new FactEditEntry();
        }

        const editEntry = await this.dataService.loadEntryEditAsync(factId);
        if (createCopy) {
            editEntry.id = undefined;
        }

        return editEntry;
    }
}
