import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { mapTo } from 'rxjs/operators';

import { HighlightService } from '../highlight.service';
import { interval, merge, Subscription } from 'rxjs';

@Component({
  selector: 'app-ex05',
  templateUrl: './ex05.component.html',
  styleUrls: ['./ex05.component.scss'],
})
export class Ex05Component implements OnInit, OnDestroy {
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

  mapTo1() {
    this.active = 'mapTo1';
    console.clear();
    this.logInConsole('emits the number 1 each second ...');
    const timer$ = interval(1000).pipe(mapTo(1)).subscribe(console.log);
    this.subscriptions.add(timer$);
  }

  merge1() {
    this.active = 'merge1';
    console.clear();
    this.logInConsole('merge() example started ...');
    const stream0$ = interval(1500).pipe(mapTo('00'));
    const stream1$ = interval(2400).pipe(mapTo('01'));
    const stream2$ = interval(3200).pipe(mapTo('10'));
    const sub = merge(stream0$, stream1$, stream2$).subscribe(console.log);
    this.subscriptions.add(sub);
  }

  logInConsole(val: string) {
    console.log(
      `%c ${val}`,
      'background: #ADFF2F66; font-weight: bold; border-radius: 3px;'
    );
  }
}
