import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';

import { interval, Observable, Subject } from 'rxjs';
import { startWith, take, takeUntil } from 'rxjs/operators';

import { HighlightService } from '../highlight.service';
import { logInConsole } from '../shared/utility';

@Component({
  selector: 'app-ex07',
  templateUrl: './ex07.component.html',
  styleUrls: ['./ex07.component.scss'],
})
export class Ex07Component implements OnInit, AfterViewChecked, OnDestroy {
  active: string = '';
  result$!: Observable<any>;
  users: any;
  unsubscribe$ = new Subject();
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
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
    console.log('unsubscribed');
  }

  exampleReset() {
    this.unsubscribe$.next(true);
    console.log('unsubscribed');
  }

  startWith1() {
    this.active = 'startWith1';
    console.clear();
    this.exampleReset();
    logInConsole('subscribed');

    interval(1000)
      .pipe(
        startWith(false, [], { 'startValue':0, 'active': true}),
        take(6),
        takeUntil(this.unsubscribe$))
      .subscribe((val) => console.log(val));
  }


}
