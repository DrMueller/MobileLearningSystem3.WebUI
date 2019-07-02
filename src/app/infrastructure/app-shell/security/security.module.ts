import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { MatDependenciesModule } from '../../mat-dependencies';

import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { TestSecurityInterceptor } from './interceptors';

@NgModule({
    declarations: [
        UserMenuComponent
    ],
    exports: [
        UserMenuComponent
    ],
    imports: [
        CommonModule,
        MatDependenciesModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TestSecurityInterceptor,
            multi: true
        }
    ]
})
export class SecurityModule { }
