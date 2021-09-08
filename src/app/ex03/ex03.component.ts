import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, Component, OnInit } from '@angular/core';

import {
  fromEvent,
  generate,
  interval,
  Observable,
  Observer,
  Subject,
  Subscription,
  timer,
} from 'rxjs';
import {
  concatMap,
  delay,
  filter,
  ignoreElements,
  map,
  skip,
  startWith,
  take,
  takeLast,
  takeUntil,
  takeWhile,
} from 'rxjs/operators';

import { HighlightService } from '../highlight.service';

@Component({
  selector: 'app-ex03',
  templateUrl: './ex03.component.html',
  styleUrls: ['./ex03.component.scss'],
})
export class Ex03Component implements OnInit, AfterViewChecked {
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

  debounce1() {
    this.active = 'debounce1';
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

  debounceTime2() {
    this.active = 'debounceTime2';
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

  throttleTime1() {
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
  
  private logInConsole(val: string) {
    console.log(
      `%c ${val}`,
      'background: #ADFF2F66; font-weight: bold; border-radius: 3px;'
    );
  }
}
