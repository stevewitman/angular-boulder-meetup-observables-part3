import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, pluck, skip, take } from 'rxjs/operators';

import { HighlightService } from '../highlight.service';
import { combineLatest, forkJoin, fromEvent, interval, Subscription, timer, zip } from 'rxjs';

@Component({
  selector: 'app-ex07',
  templateUrl: './ex07.component.html',
  styleUrls: ['./ex07.component.scss'],
})
export class Ex07Component implements OnInit, OnDestroy {
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

  forkJoin1() {
    this.active = 'forkJoin1';
    console.clear();
    this.logInConsole('forkJoin() example started ...');
    const obsA$ = interval(500).pipe(
      map((val) => 'A-' + val),
      take(4)
    );
    const obsB$ = interval(1000).pipe(
      map((val) => 'B-' + val),
      take(3)
    );
    const obsC$ = interval(3000).pipe(
      map((val) => 'C-' + val),
      take(2)
    );
    const sub = forkJoin(obsB$, obsC$, obsA$).subscribe(console.log);
    this.subscriptions.add(sub);
  }

  zip1() {
    this.active = 'zip1';
    console.clear();
    this.logInConsole('zip() example started ...');
    const obsA$ = interval(500).pipe(
      map((val) => 'A-' + val),
      take(4)
    );
    const obsB$ = interval(1000).pipe(
      map((val) => 'B-' + val),
      take(3)
    );
    const obsC$ = interval(3000).pipe(
      map((val) => 'C-' + val),
      take(2)
    );
    const sub = zip(obsB$, obsC$, obsA$).subscribe(console.log);
    this.subscriptions.add(sub);
  }

  logInConsole(val: string) {
    console.log(
      `%c ${val}`,
      'background: #ADFF2F66; font-weight: bold; border-radius: 3px;'
    );
  }
}
