import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, Component, OnInit } from '@angular/core';

import { fromEvent, interval, Observable, Observer, Subject, Subscription, timer } from 'rxjs';
import { map, skip, take, takeLast, takeUntil, takeWhile } from 'rxjs/operators';

import { HighlightService } from '../highlight.service';

@Component({
  selector: 'app-ex01',
  templateUrl: './ex01.component.html',
  styleUrls: ['./ex01.component.scss'],
})
export class Ex01Component implements OnInit, AfterViewChecked {
  active: string = '';
  val: any;
  obs1$: Observable<any>;
  sub1?: Subscription;
  sub2?: Subscription;
  observer?: Observer<any>;
  componentDestroyed$: Subject<boolean> = new Subject();

  constructor(
    private highlightService: HighlightService,
    private http: HttpClient
  ) {
    this.obs1$ = timer(2000);
  }

  ngOnInit(): void {
    console.clear();

    this.observer = {
      next: (value: any) => {
        console.log(value);
      },
      error: (error: any) => {
        console.error(error);
      },
      complete: () => {
        this.logInConsole('completed');
      },
    };
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
    this.logInConsole('subscribed');
    interval(1000)
      .pipe(take(4),
      takeUntil(this.componentDestroyed$)
    )
    .subscribe(this.observer);
  }

  take2() {
    this.active = 'take2';
    console.clear();
    this.logInConsole('subscribed');
    interval(1000)
      .pipe(
        map((n) => n + 1),
        take(4),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe(this.observer);
  }

  takeLast1() {
    this.active = 'takeLast1';
    console.clear();
    this.logInConsole('subscribed');
    interval(1000)
      .pipe(
        map((n) => n + 1),
        take(4),
        takeLast(2),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe(this.observer);
  }

  takeLast2() {
    this.active = 'takeLast2';
    console.clear();
    this.logInConsole('subscribed');
    interval(1000)
      .pipe(
        map((n) => n + 1),
        take(4),
        takeLast(10),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe(this.observer);
  }

  takeUntil1() {
    this.active = 'takeUntil1';
    console.clear();
    const timer$: Observable<any> = timer(4500);

    const interval$ = interval(1000);
    this.logInConsole('interval$ subscribed');
    interval$
      .pipe(
        map((n) => n + 1),
        takeUntil(timer$),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe(this.observer);
  }

  takeUntil2() {
    this.active = 'takeUntil2';
    console.clear();
    const clicksInDocument$ = fromEvent(document, 'click').pipe(skip(1));

    const interval$ = interval(1000);
    this.logInConsole('interval$ subscribed');
    interval$
      .pipe(
        map((n) => n + 1),
        takeUntil(clicksInDocument$)
      )
      .subscribe(this.observer);
  }

  // use componentDestroyed$ subject to guarantee unsubscription
  takeUntil3() {
    this.active = 'takeUntil3';
    console.clear();
    const clicksInDocument$ = fromEvent(document, 'click').pipe(skip(1));

    const interval$ = interval(1000);
    this.logInConsole('interval$ subscribed');
    interval$
      .pipe(
        map((n) => n + 1),
        takeUntil(clicksInDocument$),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe(this.observer);
  }

  takeWhile1() {
    this.active = 'takeWhile1';
    console.clear();
    this.logInConsole('subscribed');
    interval(1000)
      .pipe(
        map((n) => n + 1),
        takeWhile((val) => val <= 4),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe(this.observer);
  }

  private logInConsole(val: string) {
    console.log(
      `%c ${val}`,
      'background: #ADFF2F66; font-weight: bold; border-radius: 3px;'
    );
  }
}
