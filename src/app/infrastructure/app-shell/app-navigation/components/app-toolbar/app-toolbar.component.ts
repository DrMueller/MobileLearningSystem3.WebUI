import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-app-toolbar',
  templateUrl: './app-toolbar.component.html',
  styleUrls: ['./app-toolbar.component.scss']
})
export class AppToolbarComponent {
  @Output() public toggleSideNavRequested = new EventEmitter();
  @Input() public set isSidebarOpen(value: boolean) {
    this._isSidebarOpen = value;
  }

  public get isSidebarOpen(): boolean {
    return this._isSidebarOpen;
  }

  private _isSidebarOpen: boolean;

  public requestToggleSideNav(): void {
    this.toggleSideNavRequested.emit();
  }
}
