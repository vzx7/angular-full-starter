import 'moment/locale/ru';

import * as moment from 'moment';

import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

/**
 * Service for working with dates.
 */
@Injectable()
export class DateService {

  constructor() {
  }

  /**
   * Date setting.
   * @param form Form.
   * @param name Field name.
   * @param value Date.
   * @param withTime Time conversion.
   */
  public setDate(form: FormGroup, name: string, value?: any, withTime: boolean = false): void {
    if (!value) {
      return;
    }
    // If there is no value, it gives the current day.
    form.patchValue({
      [name]: {
        date: this.getDate(value, withTime)
      }
    });
  }

  /**
   * Date conversion to readable view.
   * @param date Date string.
   * @param withTime Conversion versus time.
   * @return Date in format DD.MM.YYYY
   */
  public convertDate(date: string, withTime: boolean = false): string {
    return date ? moment(date).format(this.getFormat(withTime)) : null;
  }

  /**
   * Generating rust object Date.
   * @param date Date.
   * @return Date in format UTC
   */
  public setDateFromDateJs(date: Date): string {
    return date ? moment(date).utc().format() : '';
  }

  /**
   * Amount of time to date.
   * @param date Release date.
   * @param value Data for the sample.
   * @return Time (days, weeks).
   */
  public getTimeToDate(date: string, value: moment.unitOfTime.Diff): number {
    if (!value) {
      return null;
    }

    return moment(date).diff(moment(), value);
  }

  /**
   * Time until midnight.
   * @return Time.
   */
  public getHoursToMidnight(): number {
    const end = moment().endOf('day');

    return end.diff(moment(), 'hours');
  }

  /**
   * Minute counter.
   * @return number
   */
  public getMinutesCount(): number {
    const hour = 60;

    return hour - moment().minutes();
  }

  /**
   * Seconds counter
   * @return number
   */
  public getSecondsCount(): number {
    const minutes = 60;

    return minutes - moment().seconds();
  }

  /**
   * Minute / second counter.
   * @return string
   */
  public getCounterTime(): string {
    const hours = 60;

    return String(hours - moment().hours());
  }

  /**
   * generating date.
   * @param date date if it is.
   * @param withTime Time conversion.
   * @return An object rust.
   */
  private getDate(date: string, withTime: boolean): Object {
    if (date && date !== '') {
      const mDate = moment(date, this.getFormat(withTime)).local();

      return {
        year: mDate.get('year'),
        month: mDate.get('month') + 1, // Months start at 0
        day: mDate.get('date')
      };
    } else {
      const now = new Date();

      return {
        year: now.getFullYear(),
        month: now.getMonth() + 1, // Months start at 0
        day: now.getDate()
      };
    }
  }

  /**
   * @param withTime Time conversion.
   * @return Format date.
   */
  private getFormat(withTime: boolean): string {
    return `DD.MM.YYYY${(withTime ? ' HH:mm:ss' : '')}`;
  }
}
