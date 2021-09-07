import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { buffer, bufferCount, bufferTime, tap } from 'rxjs/operators';
import { fromEvent, interval, Observable, Subscription } from 'rxjs';

import { HighlightService } from '../highlight.service';

@Component({
  selector: 'app-ex09',
  templateUrl: './ex09.component.html',
  styleUrls: ['./ex09.component.scss'],
})
export class Ex09Component implements OnInit, OnDestroy, AfterViewInit {
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

  buffer1() {
    this.active = 'buffer1';
    console.clear();
    this.logInConsole('Click "Button" for more values');
    const counter$ = interval(1000);
    if (this.buttonClicks$) {
      const sub = counter$
        .pipe(buffer(this.buttonClicks$))
        .subscribe(console.log);
      this.subscriptions.add(sub);
    }
  }

  bufferCount1() {
    this.active = 'bufferCount1';
    console.clear();
    this.logInConsole('bufferCount() with 1 arg started');
    const sub = interval(500).pipe(bufferCount(4)).subscribe(console.log);
    this.subscriptions.add(sub);
  }

  bufferCount2() {
    this.active = 'bufferCount2';
    console.clear();
    this.logInConsole('bufferCount() with 2 args started');
    const sub = interval(500).pipe(bufferCount(4, 2)).subscribe(console.log);
    this.subscriptions.add(sub);
  }

  bufferTime1() {
    this.active = 'bufferTime1';
    console.clear();
    this.logInConsole('bufferTime() example started');
    const sub = interval(500)
      .pipe(
        bufferTime(1500),
        tap((val: any) => console.log(val))
      )
      .subscribe();
    this.subscriptions.add(sub);
  }

  logInConsole(val: string) {
    console.log(
      `%c ${val}`,
      'background: #ADFF2F66; font-weight: bold; border-radius: 3px;'
    );
  }
}
