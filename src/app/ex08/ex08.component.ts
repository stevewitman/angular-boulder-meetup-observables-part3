import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { pluck, skip } from 'rxjs/operators';
import { combineLatest, fromEvent, interval, Subscription } from 'rxjs';

import { HighlightService } from '../highlight.service';

@Component({
  selector: 'app-ex08',
  templateUrl: './ex08.component.html',
  styleUrls: ['./ex08.component.scss'],
})
export class Ex08Component implements OnInit, OnDestroy {
  active: string = '';
  val: any;
  subscriptions = new Subscription();

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
    this.subscriptions.unsubscribe();
  }

  skip1() {
    this.active = 'skip1';
    console.clear();
    this.logInConsole('skip() example started ...');
    const timer$ = interval(1000)
      .pipe(skip(3))
      .subscribe(console.log)
    this.subscriptions.add(timer$);
  }

  combineLatest1() {
    this.active = 'combineLatest1';
    console.clear();
    this.logInConsole('combineLatest() example started ...');
    const timer$ = interval(1000).pipe(skip(3));
    const clicker$ = fromEvent(document, 'click').pipe(
      skip(1),
      pluck('clientX')
    );
    const sub = combineLatest(timer$, clicker$).subscribe(
      ([timerVal, clickerVal]) =>
        console.log(`Timer = ${timerVal},   Clicked X = ${clickerVal}`)
    );
    this.subscriptions.add(sub);
  }

  logInConsole(val: string) {
    console.log(
      `%c ${val}`,
      'background: #ADFF2F66; font-weight: bold; border-radius: 3px;'
    );
  }
}
