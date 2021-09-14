import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';

import { fromEvent, interval, Subject } from 'rxjs';
import { map, skip, takeUntil, withLatestFrom } from 'rxjs/operators';

import { HighlightService } from '../highlight.service';
import { logInConsole } from '../shared/utility';

@Component({
  selector: 'app-ex08',
  templateUrl: './ex08.component.html',
  styleUrls: ['./ex08.component.scss'],
})
export class Ex08Component implements OnInit, AfterViewChecked, OnDestroy {
  active: string = '';
  unsubscribe$ = new Subject();
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
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
    console.log('unsubscribed');
  }

  exampleReset() {
    this.unsubscribe$.next(true);
    console.log('example was reset');
  }

  withLatestFrom1() {
    this.active = 'withLatestFrom1';
    console.clear();
    this.exampleReset();
    logInConsole('subscribed');
    const timer$ = interval(1000);

    fromEvent<MouseEvent>(document, 'click')
      .pipe(
        skip(1),
        map(({ clientX, clientY }) => ({ x: clientX, y: clientY })),
        withLatestFrom(interval(100), interval(3000)),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(([coords, interval1, interval2]) =>
        console.log(
          coords,
          '  t1:',
          interval1,
          '  t2:',
          interval2
        )
      );
  }

}
