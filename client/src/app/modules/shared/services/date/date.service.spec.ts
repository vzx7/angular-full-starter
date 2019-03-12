import { DateService } from './date.service';

describe('DataService', () => {
  let service: DateService;

  beforeEach(() => {
    service = new DateService();
  });

  it('#convertDate should return null', () => {
    expect(service.convertDate(undefined)).toEqual(null);
    expect(service.convertDate(null)).toEqual(null);
  });

  it('#convertDate should return string', () => {
    expect(service.convertDate('2018-11-08T14:16:36')).toEqual('08.11.2018');
    expect(service.convertDate('2018-11-08T14:16:36', true)).toEqual('08.11.2018 14:16:36');
  });

  it('#convertDate should return Invalid Date', () => {
    expect(service.convertDate('some text')).toEqual('Invalid date');
  });

  it('#setDateFromDateJs should return empty', () => {
    expect(service.setDateFromDateJs(undefined)).toEqual('');
    expect(service.setDateFromDateJs(null)).toEqual('');
  });

  it('#setDateFromDateJs should return Invalid date', () => {
    const invalidDate = new Date('jfgkldf');
    expect(service.setDateFromDateJs(invalidDate)).toEqual('Invalid date');
  });

  it('#getTimeToDate should return number', () => {
    const date = '2019-03-31';
    expect(service.getTimeToDate(date, 'days')).toEqual(jasmine.any(Number));
    expect(service.getTimeToDate(date, 'weeks')).toEqual(jasmine.any(Number));
  });

  it('#getTimeToDate should return null', () => {
    const date = '2019-03-31';
    expect(service.getTimeToDate(date, null)).toEqual(null);
    expect(service.getTimeToDate(date, undefined)).toEqual(null);
  });

  it('#getHoursToMidnight should return number', () => {
    expect(service.getHoursToMidnight()).toEqual(jasmine.any(Number));
  });

  it('#getMinutesCount should return number', () => {
    expect(service.getMinutesCount()).toEqual(jasmine.any(Number));
  });

  it('#getSecondsCount should return number', () => {
    expect(service.getSecondsCount()).toEqual(jasmine.any(Number));
  });

  it('#getCounterTime should return string', () => {
    expect(service.getCounterTime()).toEqual(jasmine.any(String));
  });

});
