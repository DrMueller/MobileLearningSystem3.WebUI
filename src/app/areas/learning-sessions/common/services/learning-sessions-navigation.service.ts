import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LearningSessionsNavigationService {
  constructor(private router: Router) { }

  public navigateToOverview() {
    this.navigateTo('overview');
  }

  public navigateToEdit(sessionId: number) {
    this.navigateTo('edit', sessionId);
  }

  public navigateToSessionRun(sessionId: number) {
    this.navigateTo('runs', sessionId);
  }

  private navigateTo(...urlParts: any[]): void {
    this.router.navigate(['learningsessions', ...urlParts]);
  }
}
