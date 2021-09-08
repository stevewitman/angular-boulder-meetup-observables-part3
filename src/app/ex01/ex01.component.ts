import { AfterViewChecked, Component, OnInit } from '@angular/core';

import { fromEvent, interval, Observable, Observer, Subject, Subscription, timer } from 'rxjs';
import { map, skip, take, takeLast, takeUntil, takeWhile } from 'rxjs/operators';

import { HighlightService } from '../highlight.service';
import { logInConsole, observer } from '../shared/utility';

@Component({
  selector: 'app-ex01',
  templateUrl: './ex01.component.html',
  styleUrls: ['./ex01.component.scss'],
})
export class Ex01Component implements OnInit, AfterViewChecked {
  active: string = '';
  val: any;
  componentDestroyed$: Subject<boolean> = new Subject();

  constructor(
    private highlightService: HighlightService,
  ) {}

  ngOnInit(): void {
    console.clear();
  }

  ngAfterViewChecked() {
    this.highlightService.highlightAll();
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
    console.log('subscription complete');
  }

  take1() {
    this.active = 'take1';
    console.clear();
    logInConsole('subscribed');
    interval(1000)
      .pipe(take(4), takeUntil(this.componentDestroyed$))
      .subscribe(observer);
  }

  take2() {
    this.active = 'take2';
    console.clear();
    logInConsole('subscribed');
    interval(1000)
      .pipe(
        map((n) => n + 1),
        take(4),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe(observer);
  }

  takeLast1() {
    this.active = 'takeLast1';
    console.clear();
    logInConsole('subscribed');
    interval(1000)
      .pipe(
        map((n) => n + 1),
        take(4),
        takeLast(2),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe(observer);
  }

  takeLast2() {
    this.active = 'takeLast2';
    console.clear();
    logInConsole('subscribed');
    interval(1000)
      .pipe(
        map((n) => n + 1),
        take(4),
        takeLast(10),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe(observer);
  }

  takeUntil1() {
    this.active = 'takeUntil1';
    console.clear();
    const timer$: Observable<any> = timer(4500);

    const interval$ = interval(1000);
    logInConsole('subscribed');
    interval$
      .pipe(
        map((n) => n + 1),
        takeUntil(timer$),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe(observer);
  }

  takeUntil2() {
    this.active = 'takeUntil2';
    console.clear();
    const clicksInDocument$ = fromEvent(document, 'click').pipe(skip(1));

    const interval$ = interval(1000);
    logInConsole('subscribed');
    interval$
      .pipe(
        map((n) => n + 1),
        takeUntil(clicksInDocument$)
      )
      .subscribe(observer);
  }

  // use componentDestroyed$ subject to guarantee unsubscription
  takeUntil3() {
    this.active = 'takeUntil3';
    console.clear();
    const clicksInDocument$ = fromEvent(document, 'click').pipe(skip(1));

    const interval$ = interval(1000);
    logInConsole('subscribed');
    interval$
      .pipe(
        map((n) => n + 1),
        takeUntil(clicksInDocument$),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe(observer);
  }

  takeWhile1() {
    this.active = 'takeWhile1';
    console.clear();
    logInConsole('subscribed');
    interval(1000)
      .pipe(
        map((n) => n + 1),
        takeWhile((val) => val <= 4),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe(observer);
  }

}
