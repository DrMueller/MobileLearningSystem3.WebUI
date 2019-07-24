import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { MatDependenciesModule } from '../../mat-dependencies';
import { BusyIndicationModule } from '../../shared-features/busy-indication/busy-indication.module';
import { RxFormsModule } from '../../shared-features/rx-forms';

import { LogInComponent } from './components/log-in/log-in.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { BearerAuthInterceptor } from './interceptors';

@NgModule({
    declarations: [
        UserMenuComponent,
        LogInComponent
    ],
    exports: [
        UserMenuComponent
    ],
    imports: [
        BusyIndicationModule,
        CommonModule,
        RxFormsModule,
        MatDependenciesModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: BearerAuthInterceptor,
            multi: true
        }
    ]
})
export class SecurityModule { }
