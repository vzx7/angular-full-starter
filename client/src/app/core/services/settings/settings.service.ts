import { Injectable } from '@angular/core';

import { versions } from '../../../../environments/versions';

/**
 * Settings service.
 */
@Injectable()
export class SettingsService {

  constructor() {}

  /**
   * Getting settings.
   */
  public loadSettings(): void {
    console.log(JSON.stringify(versions));
  }
}
