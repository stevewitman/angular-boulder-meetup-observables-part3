import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, Component, OnInit } from '@angular/core';

import {
  from,
  interval,
  Observable,
  Observer,
  Subject,
  Subscription,
  timer,
} from 'rxjs';
import {
  map,
  skip,
  skipLast,
  skipUntil,
  skipWhile,
  take,
  takeUntil,
  takeWhile,
} from 'rxjs/operators';

import { HighlightService } from '../highlight.service';

@Component({
  selector: 'app-ex02',
  templateUrl: './ex02.component.html',
  styleUrls: ['./ex02.component.scss'],
})
export class Ex02Component implements OnInit, AfterViewChecked {
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

  skip2() {
    this.active = 'skip2';
    console.clear();
    this.logInConsole('subscribed');
    interval(100)
      .pipe(
        map((n) => (n + 1) / 10),
        skip(5),
        takeWhile((n) => n <= 2),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe(this.observer);
  }

  skipLast1() {
    this.active = 'skipLast1';
    console.clear();
    this.logInConsole('subscribed');
    from(['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'])
      .pipe(skipLast(2), takeUntil(this.componentDestroyed$))
      .subscribe(this.observer);
  }

  skipUntil1() {
    this.active = 'skipUntil1';
    console.clear();
    const obs1$: Observable<any> = interval(2500);

    const interval$ = interval(1000);
    this.logInConsole('interval$ subscribed');
    interval$
      .pipe(
        map((n) => n + 1),
        skipUntil(obs1$),
        take(5),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe(this.observer);
  }

  skipWhile1() {
    this.active = 'skipWhile1';
    console.clear();
    this.logInConsole('subscribed');
    interval(1000)
      .pipe(
        map((n) => n + 1),
        skipWhile((val) => val < 3),
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
