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
    this.navigateTo(sessionId.toString());
  }

  private navigateTo(urlPart: string): void {
    this.router.navigate(['learningsessions', urlPart]);
  }
}
