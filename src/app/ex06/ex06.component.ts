import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, mapTo, take } from 'rxjs/operators';

import { HighlightService } from '../highlight.service';
import { concat, interval, merge, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-ex06',
  templateUrl: './ex06.component.html',
  styleUrls: ['./ex06.component.scss'],
})
export class Ex06Component implements OnInit, OnDestroy {
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

  take1() {
    this.active = 'take1';
    console.clear();
    this.logInConsole('completes after 5 values ...');
    of(5,7,6,5,8,9,6,3,4,7,1,7).
      pipe(
        take(5)
      )
      .subscribe(console.log);
  }

  concat1() {
    this.active = 'concat1';
    console.clear();
    this.logInConsole('concat() example started ...');
    const obsA$ = interval(500).pipe(map(val => 'A-' + val), take(4));
    const obsB$ = interval(1000).pipe(map(val => 'B-' + val), take(3));
    const obsC$ = interval(3000).pipe(map(val => 'C-' + val), take(2));
    const sub = concat(obsB$, obsC$, obsA$).subscribe(console.log);
    this.subscriptions.add(sub);
  }

  logInConsole(val: string) {
    console.log(
      `%c ${val}`,
      'background: #ADFF2F66; font-weight: bold; border-radius: 3px;'
    );
  }
}
