import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';

import {
  from,
  interval,
  Observable,
  Subject,
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
import { logInConsole, observer } from '../shared/utility';

@Component({
  selector: 'app-ex02',
  templateUrl: './ex02.component.html',
  styleUrls: ['./ex02.component.scss'],
})
export class Ex02Component implements OnInit, AfterViewChecked, OnDestroy {
  active: string = '';
  val: any;
  componentDestroyed$: Subject<boolean> = new Subject();

  constructor(
    private highlightService: HighlightService,
    private http: HttpClient
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

  skip2() {
    this.active = 'skip2';
    console.clear();
    logInConsole('subscribed');
    interval(100)
      .pipe(
        map((n) => (n + 1) / 10),
        skip(5),
        takeWhile((n) => n <= 2),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe(observer);
  }

  skipLast1() {
    this.active = 'skipLast1';
    console.clear();
    logInConsole('subscribed');
    from(['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'])
      .pipe(skipLast(2), takeUntil(this.componentDestroyed$))
      .subscribe(observer);
  }

  skipUntil1() {
    this.active = 'skipUntil1';
    console.clear();
    const obs1$: Observable<any> = interval(2500);

    const interval$ = interval(1000);
    logInConsole('subscribed');
    interval$
      .pipe(
        map((n) => n + 1),
        skipUntil(obs1$),
        take(5),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe(observer);
  }

  skipWhile1() {
    this.active = 'skipWhile1';
    console.clear();
    logInConsole('subscribed');
    interval(1000)
      .pipe(
        map((n) => n + 1),
        skipWhile((val) => val < 3),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe(observer);
  }
}
