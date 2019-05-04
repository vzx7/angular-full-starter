import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../../../environments/environment';
import { appConfig } from '../../../../app.configs';

/**
 * Request Processing Service.
 */
@Injectable()
export class RequestService {

 /**
  * Headers.
  */
  private readonly header;

  constructor(
    private readonly httpClient: HttpClient
  ) {
    this.header = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  /**
   * POST.
   * @param url Url.
   * @param complete Complete function.
   * @param body Body request.
   * @param isRealBack Whether to carry out requests through a real backend.
   * @param headers Header fields
   * @return Returns the Observable of the response object.
   */
  public post<T>(url: string, complete?: Function, body?: Object,
    isRealBack = false, headers?: Object): Observable<T> {
    return this.httpClient.post<T>(this.getHost(isRealBack) + url, body, { headers: headers || this.header })
      .pipe(
        finalize(complete()),
      );
  }

  /**
   * GET.
   * @param url Url.
   * @param complete Complete function.
   * @param isRealBack Whether to carry out requests through a real backend.
   * @param headers Header fields
   * @return Returns the Observable of the response object.
   */
  public get<T>(url: string, complete?: Function, isRealBack = false, headers?: Object): Observable<T> {
    return this.httpClient.get<T>(this.getHost(isRealBack) + url, { headers: headers || this.header })
      .pipe(
        finalize(complete()),
      );
  }

  /**
   * PUT.
   * @param url Url.
   * @param body Body request.
   * @param complete Complete function.
   * @param isRealBack Whether to carry out requests through a real backend.
   * @param headers Header fields
   * @return Returns the Observable of the response object.
   */
  public put<T>(url: string, body?: Object, complete?: Function, isRealBack = false, headers?: Object): Observable<T> {
    return this.httpClient.put<T>(this.getHost(isRealBack) + url, body, { headers: headers || this.header })
      .pipe(
        finalize(complete()),
      );
  }

  /**
   * Get file.
   * @param url Url.
   * @param complete Complete function.
   * @param querryParams Query parameters.
   * @return Observable type.
   */
  public getBlobRest<T>(url: string, complete?: Function, querryParams?: string): /*  Observable<T | any> */ any {
/*     return this.httpClient.get(environment.host + url,
      { params: new HttpParams({ fromString: querryParams }), headers: this.header, responseType: 'blob' })
      .pipe(map((res: any) => {
        const blob = new Blob([res]);

        return blob;
      }))
      .pipe(finalize(complete())); */
  }

  /**
   * Formation of the query parameter for GET.
   * @param params Object with parameters.
   * @return Returns the query string.
   */
  public prepareGetParams(params: Object): string {
    let query = '';
    let first = true;
    for (const paramKey in params) {
      if (params.hasOwnProperty(paramKey)) {
        query += `${first ? '' : '&'}${paramKey}=${params[paramKey]}`;
        first = false;
      }
    }

    return query;
  }

  /**
   * We form titles for sending.
   * @return headers
   */
  public setHeadersForMultipartFormData(): HttpHeaders {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return headers;
  }

  /**
   * Get host.
   * @param isReal Is a real backend needed.
   * @return host.
   */
  private getHost(isReal: boolean): string {
    /* return isReal ? environment.host : environment.host; */
    return '';
  }

}
