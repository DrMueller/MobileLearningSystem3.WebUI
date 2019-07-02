import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './entry-point/components/home/home.component';
import { WelcomeComponent } from './welcome/components/welcome/welcome.component';
import { MatDependenciesModule } from 'src/app/infrastructure/mat-dependencies';

@NgModule({
  declarations: [HomeComponent, WelcomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatDependenciesModule
  ]
})
export class HomeModule { }
