import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FactsNavigationService {
  constructor(private router: Router) { }

  public navigateToOverview() {
    this.router.navigate(['facts', 'overview']);
  }

  public navigateToEdit(factId: number, createCopy: boolean) {
    const route = this.router.createUrlTree(['facts', factId.toString()], { queryParams: { createCopy: createCopy } });
    if (createCopy) {
      window.open(route.toString(), '_blank');
    } else {
      this.router.navigateByUrl(route);
    }
  }
}
