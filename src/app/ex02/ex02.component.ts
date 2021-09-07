import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';

import { fromEvent, interval, Subscription, timer } from 'rxjs';

import { HighlightService } from '../highlight.service';

@Component({
  selector: 'app-ex02',
  templateUrl: './ex02.component.html',
  styleUrls: ['./ex02.component.scss'],
})
export class Ex02Component implements OnInit, OnDestroy, AfterViewChecked {
  active: string = '';
  fromEventSub?: Subscription;
  intervalSub?: Subscription;
  timerSub?: Subscription;
  subscriptions = new Subscription();

  constructor(private highlightService: HighlightService) {}

  ngOnInit(): void {
    console.clear();
  }

  ngAfterViewChecked() {
    this.highlightService.highlightAll();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  fromEvent1() {
    this.active = 'fromEvent1';
    // console.clear();
    this.logInConsole("fromEvent(document, 'click')");
    this.fromEventSub = fromEvent(document, 'click')
      .subscribe(console.log);
    this.subscriptions.add(this.fromEventSub);
  }

  interval1() {
    this.active = 'interval1';
    // console.clear();
    this.logInConsole('interval(1000)');
    this.intervalSub = interval(1000).subscribe(console.log);
    this.subscriptions.add(this.intervalSub);
  }

  timer1() {
    this.active = 'timer1';
    // console.clear();
    this.logInConsole('timer(2500)');
    this.timerSub = timer(2500).subscribe(console.log);
    this.subscriptions.add(this.timerSub);
  }

  timer2() {
    this.active = 'timer2';
    // console.clear();
    this.logInConsole('timer(3000, 500)');
    this.timerSub = timer(3000, 500).subscribe(console.log);
    this.subscriptions.add(this.timerSub);
  }

  logInConsole(val: string) {
    console.log(
      `%c ${val} emits ... `,
      'background: #ADFF2F66; font-weight: bold; border-radius: 3px;'
    );
  }
}
