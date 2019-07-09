import { ComponentFactory, ComponentFactoryResolver, Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import { BusyIndicatorComponent } from '../components/busy-indicator';

@Directive({
  selector: '[appBusyIndicator]'
})
export class BusyIndicatorDirective {
  private _indicatorFactory: ComponentFactory<BusyIndicatorComponent>;

  public constructor(
    private templateRef: TemplateRef<any>,
    private vcRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver) {
    this._indicatorFactory = this.componentFactoryResolver.resolveComponentFactory(BusyIndicatorComponent);
  }

  @Input()
  public set appBusyIndicator(isBusy: boolean) {
    this.vcRef.clear();

    if (isBusy) {
      this.vcRef.createComponent(this._indicatorFactory);
    } else {
      this.vcRef.createEmbeddedView(this.templateRef);
    }
  }
}
