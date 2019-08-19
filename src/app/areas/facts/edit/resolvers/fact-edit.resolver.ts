import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { FactEditEntry } from 'src/app/areas/shared-domain/models/fact-edit-entry.model';
import { FactRepositoryService } from 'src/app/areas/shared-domain/repos';

import { FactServicesModule } from '../../fact-services.module';

@Injectable({
    providedIn: FactServicesModule
})
export class FactEditResolver implements Resolve<Promise<FactEditEntry>>  {
    public constructor(
        private factRepo: FactRepositoryService) {
    }

    public async resolve(route: ActivatedRouteSnapshot): Promise<FactEditEntry> {
        const factId = parseInt(route.paramMap.get('factid')!, 10);
        const createCopy = route.queryParamMap.get('createCopy') === 'true';
        if (factId === -1) {
            return new FactEditEntry();
        }

        const editEntry = await this.factRepo.loadEditEntryAsync(factId);
        if (createCopy) {
            editEntry.id = undefined;
        }

        return editEntry;
    }
}
