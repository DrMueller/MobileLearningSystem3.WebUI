import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BusyIndicatorComponent } from './components/busy-indicator';
import { BusyIndicatorDirective } from './directives';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        BusyIndicatorDirective
    ],
    entryComponents: [
        BusyIndicatorComponent
    ],
    declarations: [
        BusyIndicatorDirective,
        BusyIndicatorComponent
    ]
})
export class BusyIndicationModule { }
