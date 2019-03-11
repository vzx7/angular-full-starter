import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';
import 'moment/locale/ru';

/**
 * Сервис для работы с датами
 */
@Injectable()
export class DateService {

  constructor() {
  }

  /**
   * Настройка даты в датапекере
   * @param form Форма.
   * @param name Название поля.
   * @param value дата.
   * @param withTime Конвертация с временем
   */
  public setDate(form: FormGroup, name: string, value?: any, withTime: boolean = false): void {
    if (!value) {
      return;
    }
    // При отсутствии value выдает текущий день
    form.patchValue({
      [name]: {
        date: this.getDate(value, withTime)
      }
    });
  }

  /**
   * Конвертация даты в читемый вид
   * @param date Дата в виде строки
   * @param withTime Конвертация с временем
   * @return Дату в формате DD.MM.YYYY
   */
  public convertDate(date: string, withTime: boolean = false): string {
    return date ? moment(date).format(this.getFormat(withTime)) : null;
  }

  /**
   * Генерация даты из объекта Date
   * @param date дата.
   * @return Дата в формате UTC
   */
  public setDateFromDateJs(date: Date): string {
    return date ? moment(date).utc().format() : '';
  }

  /**
   * Количество времени до даты
   * @param date Дата релиза
   * @param value Данные для выборки
   * @return Время (дни, недели)
   */
  public getTimeToDate(date: string, value: moment.unitOfTime.Diff): number {
    if (!value) {
      return null;
    }

    return moment(date).diff(moment(), value);
  }

  /**
   * Время до полуночи
   * @return время
   */
  public getHoursToMidnight(): number {
    const end = moment().endOf('day');

    return end.diff(moment(), 'hours');
  }

  /**
   * Счетчик минут
   * @return number
   */
  public getMinutesCount(): number {
    const hour = 60;

    return hour - moment().minutes();
  }

  /**
   * Счетчик секунд
   * @return number
   */
  public getSecondsCount(): number {
    const minutes = 60;

    return minutes - moment().seconds();
  }

  /**
   * Счетчик минут / секунд
   * @return string
   */
  public getCounterTime(): string {
    const hours = 60;

    return String(hours - moment().hours());
  }

  /**
   * Генерация даты
   * @param date дата если она есть.
   * @param withTime Конвертация с временем
   * @return объект даты
   */
  private getDate(date: string, withTime: boolean): Object {
    if (date && date !== '') {
      const mDate = moment(date, this.getFormat(withTime)).local();

      return {
        year: mDate.get('year'),
        month: mDate.get('month') + 1, // Месяцы начинаются с 0
        day: mDate.get('date')
      };
    } else {
      const now = new Date();

      return {
        year: now.getFullYear(),
        month: now.getMonth() + 1, // Месяцы начинаются с 0
        day: now.getDate()
      };
    }
  }

  /**
   * @param withTime Конвертация с временем
   * @return Формат даты
   */
  private getFormat(withTime: boolean): string {
    return `DD.MM.YYYY${(withTime ? ' HH:mm:ss' : '')}`;
  }
}
