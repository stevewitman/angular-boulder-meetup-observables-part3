import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, Component, OnInit } from '@angular/core';

import { from, interval, Observable, of, Subscription, timer } from 'rxjs';
import { map, take, takeLast, takeUntil, takeWhile, tap } from 'rxjs/operators';

import { HighlightService } from '../highlight.service';

@Component({
  selector: 'app-ex01',
  templateUrl: './ex01.component.html',
  styleUrls: ['./ex01.component.scss'],
})
export class Ex01Component implements OnInit, AfterViewChecked {
  active: string = '';
  val: any;
  sub1?: Subscription;
  sub2?: Subscription;

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

  take1() {
    this.active = 'take1';
    console.clear();
    this.logInConsole('take example started ...');
    this.sub1 = interval(500).pipe(
      take(5)
    ).subscribe(console.log)
  }

  takeLast1() {
    this.active = 'takeLast1';
    console.clear();
    this.logInConsole('takeLast example started ...');
    this.sub1 = interval(500).pipe(
      take(5),
      takeLast(2)
    ).subscribe(console.log)
  }

  takeLast2() {
    this.active = 'takeLast2';
    console.clear();
    this.logInConsole('takeLast example started ...');
    this.sub1 = interval(500).pipe(
      take(5),
      takeLast(10)
    ).subscribe(console.log)
  }

  takeUntil1() {
    this.active = 'takeUntil1';
    console.clear();
    this.logInConsole('takeUntil example started ...');
    const timer$: Observable<any> = timer(4000);
    this.sub1 = timer$.subscribe(val => console.log('Timer:', val));
    this.sub2 = interval(500).pipe(
      takeUntil(timer$)
    ).subscribe(console.log)
  }

  takeWhile1() {
    this.active = 'takeWhile1';
    console.clear();
    this.logInConsole('takeWhile example started ...');
    this.sub1 = interval(500).pipe(
      takeWhile(val => val <= 4)
    ).subscribe(console.log)
  }

  logInConsole(val: string) {
    console.log(
      `%c ${val}`,
      'background: #ADFF2F66; font-weight: bold; border-radius: 3px;'
    );
  }
}
