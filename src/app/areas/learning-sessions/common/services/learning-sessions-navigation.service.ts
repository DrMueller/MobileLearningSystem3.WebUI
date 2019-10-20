import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { LearningSessionsServicesModule } from '../../learning-sessions-services.module';

@Injectable({
  providedIn: LearningSessionsServicesModule
})
export class LearningSessionsNavigationService {
  constructor(private router: Router) { }

  public navigateToOverview() {
    this.navigateTo('overview');
  }

  public navigateToEdit() {
    this.navigateTo('edit');
  }

  public navigateToSessionRun() {
    this.navigateTo('runs');
  }

  private navigateTo(...urlParts: any[]): void {
    this.router.navigate(['learningsessions', ...urlParts]);
  }
}
