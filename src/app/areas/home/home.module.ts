import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDependenciesModule } from 'src/app/infrastructure/mat-dependencies';
import { BusyIndicationModule } from 'src/app/infrastructure/shared-features/busy-indication/busy-indication.module';

import { HomeComponent } from './entry-point/components/home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { WelcomeComponent } from './welcome/components/welcome/welcome.component';

@NgModule({
  declarations: [HomeComponent, WelcomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatDependenciesModule,
    BusyIndicationModule
  ]
})
export class HomeModule { }
