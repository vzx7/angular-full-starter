import { BehaviorSubject, Observable } from 'rxjs';
import { publish, refCount } from 'rxjs/operators';

import { Injectable } from '@angular/core';

/**
 * Service of notifications
 */
@Injectable()
export class NotificationService {

  public readonly notificationObservable: Observable<string>;
  private readonly notificationBehavior: BehaviorSubject<string>;

  constructor() {
    this.notificationBehavior = new BehaviorSubject(null);
    this.notificationObservable = this.notificationBehavior.asObservable().pipe(
      publish(),
      refCount()
    );
  }

  public notify(message) {
    this.notificationBehavior.next(message);
    const duration = 10000;
    setTimeout(() => this.notificationBehavior.next(null), duration);
  }
}
