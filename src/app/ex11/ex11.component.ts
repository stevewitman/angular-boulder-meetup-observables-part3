import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { buffer, filter, find, first, last, single, take } from 'rxjs/operators';
import { from, fromEvent, interval, Observable, Subscription } from 'rxjs';

import { HighlightService } from '../highlight.service';

@Component({
  selector: 'app-ex11',
  templateUrl: './ex11.component.html',
  styleUrls: ['./ex11.component.scss'],
})
export class Ex11Component implements OnInit, OnDestroy, AfterViewInit {
  active: string = '';
  val: any;
  subscriptions = new Subscription();
  @ViewChild('triggerBtn', { read: ElementRef }) triggerBtn?: ElementRef;
  buttonClicks$: Observable<any> | undefined;

  constructor(
    private highlightService: HighlightService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    console.clear();
  }

  ngAfterViewInit() {
    if (this.triggerBtn) {
      this.buttonClicks$ = fromEvent(this.triggerBtn.nativeElement, 'click');
    }
  }

  ngAfterViewChecked() {
    this.highlightService.highlightAll();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  first1() {
    this.active = 'first1';
    console.clear();
    console.log('ASDGHFDGSAF');
    this.logInConsole('first(num => num >= 70) ...');
    from([57, 82, 77, 82, 98])
      .pipe(first((num) => num >= 70))
      .subscribe(console.log);
  }

  first2() {
    this.active = 'first2';
    console.clear();
    this.logInConsole('first(num => num < 50) ...');
    from([57, 82, 77, 82, 98])
      .pipe(first((num) => num < 50))
      .subscribe(console.log);
  }

  first3() {
    this.active = 'first3';
    console.clear();
    this.logInConsole('first(num => num > 2) ...');
    interval(1000)
      .pipe(first((num) => num > 2))
      .subscribe(console.log);
  }

  last1() {
    this.active = 'last1';
    console.clear();
    this.logInConsole('last(num => num < 80) ...');
    from([57, 82, 77, 82, 98])
      .pipe(last((num) => num < 80))
      .subscribe(console.log);
  }

  last2() {
    this.active = 'last2';
    console.clear();
    this.logInConsole('last(num => num === 100) ...');
    from([57, 82, 77, 82, 98])
      .pipe(last((num) => num === 100))
      .subscribe(console.log);
  }

  last3() {
    this.active = 'last3';
    console.clear();
    this.logInConsole('last(num => num < 3) ...');
    interval(1000)
      .pipe(
        take(5),
        last((num) => num < 3)
      )
      .subscribe(console.log);
  }

  logInConsole(val: string) {
    console.log(
      `%c ${val}`,
      'background: #ADFF2F66; font-weight: bold; border-radius: 3px;'
    );
  }
}
