import { Injectable } from '@angular/core';
import { HttpBaseService } from 'src/app/core/http/services';

@Injectable({
  providedIn: 'root'
})

export class HelloHttpService extends HttpBaseService {
  protected getResourceUrl(): string {
    return 'hello';
  }
}
