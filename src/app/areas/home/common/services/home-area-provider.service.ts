import { Injectable } from '@angular/core';
import { IAppAreaProviderService } from 'src/app/shell/app-areas/interfaces';
import { AppArea } from 'src/app/shell/app-areas/models';

@Injectable()
export class HomeAreaProviderService implements IAppAreaProviderService {
  public provideArea(): AppArea {
    return new AppArea('Home', '/home', false);
  }
}
