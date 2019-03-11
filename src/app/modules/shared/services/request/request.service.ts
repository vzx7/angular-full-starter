import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { appConfig } from '../../../../app.configs';
import { environment } from '../../../../../environments/environment';

/**
 * Сервис обработки запросов
 */
@Injectable()
export class RequestService {

 /**
  * Заголовки
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
   * Запрос POST.
   * @param url Урл.
   * @param complete Функция, которая вызывается в любом случае
   * @param body Тело запроса.
   * @param isRealBack Проводить ли запросы через реальный бекенд.
   * @param headers Поля заголовков.
   * @return Вернет Observable объекта ответа.
   */
  public post<T>(url: string, complete?: Function, body?: Object,
    isRealBack = false, headers?: Object): Observable<T> {
    return this.httpClient.post<T>(this.getHost(isRealBack) + url, body, { headers: headers || this.header })
      .pipe(
        finalize(complete()),
      );
  }

  /**
   * Запрос GET.
   * @param url Урл.
   * @param complete Функция, которая вызывается в любом случае
   * @param isRealBack Проводить ли запросы через реальный бекенд.
   * @param headers Поля заголовков.
   * @return Вернет Observable объекта ответа.
   */
  public get<T>(url: string, complete?: Function, isRealBack = false, headers?: Object): Observable<T> {
    return this.httpClient.get<T>(this.getHost(isRealBack) + url, { headers: headers || this.header })
      .pipe(
        finalize(complete()),
      );
  }

  /**
   * Запрос PUT.
   * @param url Урл.
   * @param body Тело запроса.
   * @param complete Функция, которая вызывается в любом случае
   * @param isRealBack Проводить ли запросы через реальный бекенд.
   * @param headers Поля заголовков.
   * @return Вернет Observable объекта ответа.
   */
  public put<T>(url: string, body?: Object, complete?: Function, isRealBack = false, headers?: Object): Observable<T> {
    return this.httpClient.put<T>(this.getHost(isRealBack) + url, body, { headers: headers || this.header })
      .pipe(
        finalize(complete()),
      );
  }

  /**
   * Получить файл.
   * @param url Урл.
   * @param complete Функция, которая вызывается в любом случае
   * @param querryParams Параметры запроса.
   * @return Observable типа
   */
  public getBlobRest<T>(url: string, complete?: Function, querryParams?: string): Observable<T | any> {
    return this.httpClient.get(environment.fakeHost + url,
      { params: new HttpParams({ fromString: querryParams }), headers: this.header, responseType: 'blob' })
      .pipe(map((res: any) => {
        const blob = new Blob([res]);

        return blob;
      }))
      .pipe(finalize(complete()));
  }

  /**
   * Формирование query параметра для GET.
   * @param params Объект с параметрами.
   * @return Вернет строку запроса.
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
   * Формируем заголовки для отправки
   * @return Заголовки
   */
  public setHeadersForMultipartFormData(): HttpHeaders {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return headers;
  }

  /**
   * Взятие хоста
   * @param isReal Необходим ли реальный бекенд
   * @return хост
   */
  private getHost(isReal: boolean): string {
    return isReal ? environment.realHost : environment.fakeHost;
  }

}
