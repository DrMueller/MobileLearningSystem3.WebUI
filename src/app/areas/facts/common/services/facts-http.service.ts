import { Injectable } from '@angular/core';
import { HttpBaseService } from 'src/app/infrastructure/core-services/http/services';

@Injectable({
  providedIn: 'root'
})
export class FactsHttpService extends HttpBaseService {
  protected getResourceUrl(): string {
    return 'facts';
  }
}
