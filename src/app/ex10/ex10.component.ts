import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { buffer, filter, find, single } from 'rxjs/operators';
import { from, fromEvent, interval, Observable, Subscription } from 'rxjs';

import { HighlightService } from '../highlight.service';

@Component({
  selector: 'app-ex10',
  templateUrl: './ex10.component.html',
  styleUrls: ['./ex10.component.scss'],
})
export class Ex10Component implements OnInit, OnDestroy, AfterViewInit {
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

  filter1() {
    this.active = 'filter1';
    console.clear();
    this.logInConsole('filter(num => num > 75) ...');
    from([57, 82, 77, 82, 98])
      .pipe(filter(num => num > 75))
      .subscribe(console.log);
  }

  filter2() {
    this.active = 'filter2';
    console.clear();
    this.logInConsole('filter(num => num === 100) ...');
    from([57, 82, 77, 82, 98])
      .pipe(filter((num) => num === 100))
      .subscribe(console.log);
  }

  find1() {
    this.active = 'find1';
    console.clear();
    this.logInConsole('find(num => num > 75) ...');
    from([57, 82, 77, 82, 98])
      .pipe(find((num) => num > 75))
      .subscribe(console.log);
  }

  find2() {
    this.active = 'find2';
    console.clear();
    this.logInConsole('find(num => num === 100) ...');
    from([57, 82, 77, 82, 98])
      .pipe(find((num) => num === 100))
      .subscribe(console.log);
  }

  single1() {
    this.active = 'single1';
    console.clear();
    this.logInConsole('single(num => num === 82) ...');
    from([57, 82, 77, 82, 98])
      .pipe(single(num => num === 82))
      .subscribe(console.log);
  }

  single2() {
    this.active = 'single2';
    console.clear();
    this.logInConsole('single(num => num === 77) ...');
    from([57, 82, 77, 82, 98])
      .pipe(single(num => num === 77))
      .subscribe(console.log);
  }

  single3() {
    this.active = 'single3';
    console.clear();
    this.logInConsole('single(num => num === 100) ...');
    from([57, 82, 77, 82, 98])
      .pipe(single(num => num === 100))
      .subscribe(console.log);
  }

  logInConsole(val: string) {
    console.log(
      `%c ${val}`,
      'background: #ADFF2F66; font-weight: bold; border-radius: 3px;'
    );
  }
}
