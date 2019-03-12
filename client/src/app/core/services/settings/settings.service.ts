import { Injectable } from '@angular/core';

import { versions } from '../../../../environments/versions';

/**
 * Сервис настроек
 */
@Injectable()
export class SettingsService {

  constructor() {}

  /**
   * Получение настроек.
   */
  public loadSettings(): void {
    console.log(JSON.stringify(versions));
  }
}
