import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { MatDependenciesModule } from '../../mat-dependencies';
import { PwaModule } from '../../shared-features/pwa';
import { SecurityModule } from '../security';

import { AppNavigationComponent } from './components/app-navigation';
import { AppToolbarComponent } from './components/app-toolbar';
import { UserMenuComponent } from './components/user-menu';
import { AppNavigationEntryFactoryService } from './services';

@NgModule({
  declarations: [
    AppNavigationComponent,
    AppToolbarComponent,
    UserMenuComponent
  ],
  exports: [
    AppNavigationComponent
  ],
  providers: [
    AppNavigationEntryFactoryService
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatDependenciesModule,
    PwaModule,
    SecurityModule,
    TranslateModule
  ]
})
export class AppNavigationModule { }
