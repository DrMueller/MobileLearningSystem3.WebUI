import { Injectable } from '@angular/core';
import { HttpBaseService } from 'src/app/infrastructure/core-services/http/services';

import { LearningSessionsServicesModule } from '../../learning-sessions-services.module';

@Injectable({
  providedIn: LearningSessionsServicesModule
})
export class LearningSessionsHttpService extends HttpBaseService {
  protected getResourceUrl(): string {
    return 'learningsessions';
  }
}
