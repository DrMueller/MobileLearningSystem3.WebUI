import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FactsNavigationService {
  constructor(private router: Router) { }

  public navigateToOverview() {
    this.navigateTo('overview');
  }

  public navigateToEdit(factId: number) {
    this.navigateTo(factId.toString());
  }

  private navigateTo(urlPart: string): void {
    this.router.navigate(['facts', urlPart]);
  }
}
