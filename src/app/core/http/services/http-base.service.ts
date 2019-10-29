import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AppSettingsSingletonService } from '../../app-settings/services';

@Injectable({
  providedIn: 'root'
})

export abstract class HttpBaseService {
  public constructor(
    private httpClient: HttpClient,
    private appSettingsSingleton: AppSettingsSingletonService) { }

  public delete$<T>(relativeUrl?: string | number): Observable<T> {
    const completeUrl = this.createCompleteUrl(relativeUrl);
    const requestOptions = this.createOptions();
    return this.httpClient.delete<T>(completeUrl, requestOptions);
  }

  public get$<T>(relativeUrl?: string | number): Observable<T> {
    const completeUrl = this.createCompleteUrl(relativeUrl);
    const requestOptions = this.createOptions();

    return this.httpClient.get<T>(completeUrl, requestOptions);
  }

  public post<T>(relativeUrl: string, body: any): Observable<T> {
    const completeUrl = this.createCompleteUrl(relativeUrl);

    const requestOptions = this.createOptions();
    return this.httpClient.post<T>(completeUrl, body, requestOptions);
  }

  public put$<T>(relativeUrl: string, body: any): Observable<T> {
    const completeUrl = this.createCompleteUrl(relativeUrl);
    const requestOptions = this.createOptions();
    return this.httpClient.put<T>(completeUrl, body, requestOptions);
  }

  protected abstract getResourceUrl(): string;

  private createCompleteUrl(relativeUrl?: string | number): string {
    let result = this.appSettingsSingleton.instance.serverBaseUrl;
    result = result + this.getResourceUrl() + '/';

    if (relativeUrl) {
      result += relativeUrl;
    }

    return result;
  }

  private createOptions(): object {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const httpOptions = {
      headers: headers
    };

    return httpOptions;
  }
}
