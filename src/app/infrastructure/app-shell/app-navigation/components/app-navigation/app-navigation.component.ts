import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';

import { AppNavigationEntry } from '../../models';
import { AppNavigationEntryFactoryService } from '../../services';

@Component({
  selector: 'app-app-navigation',
  templateUrl: './app-navigation.component.html',
  styleUrls: ['./app-navigation.component.scss']
})

export class AppNavigationComponent implements OnInit {

  public get isSidebarOpen(): boolean {
    return this._isSidebarOpen;
  }

  @ViewChild('sideNav', { static: false }) public sideNav: MatSidenav;

  public isRouterLoading = false;
  public appNavigationEntries: AppNavigationEntry[] = [];
  private _isSidebarOpen: boolean;

  public constructor(
    private navigationEntriesFactory: AppNavigationEntryFactoryService) {
  }

  public get versionDescription(): string {
    // return environment.version;
    return '1.3.3.7';
  }

  public ngOnInit(): void {
    this.appNavigationEntries = this.navigationEntriesFactory.createNavigationEntries();
    this._isSidebarOpen = false;
  }

  public sidebarOpenChanged(isOpen: boolean): void {
    this._isSidebarOpen = isOpen;
  }

  public closeSideNav(): void {
    this.sideNav.close();
  }

  public toggleSideNav(): void {
    this.sideNav.toggle();
  }
}
