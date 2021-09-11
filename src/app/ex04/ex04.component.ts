import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { fromEvent, Observable, Subject } from 'rxjs';
import { map, takeUntil, throttleTime } from 'rxjs/operators';

import { HighlightService } from '../highlight.service';
import { logInConsole } from '../shared/utility';

@Component({
  selector: 'app-ex04',
  templateUrl: './ex04.component.html',
  styleUrls: ['./ex04.component.scss'],
})
export class Ex04Component implements OnInit, AfterViewChecked, OnDestroy {
  active: string = '';
  keyup$!: Observable<any>;
  throttled$!: Observable<any>;
  unsubscribe$ = new Subject();
  withoutThrottle: string = '';
  exampleForm = new FormGroup({
    exampleInput: new FormControl({ value: '', disabled: true }),
  });

  constructor(private highlightService: HighlightService) {}

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

  throttle1() {
    this.active = 'throttle1';
    console.clear();
    this.exampleReset();
    this.withoutThrottle = '';
    this.exampleForm.get('exampleInput')?.reset();
    this.exampleForm.get('exampleInput')?.enable();
    logInConsole('subscribed');
    const exampleInput = document.getElementById('exampleInput')!;

    this.keyup$ = fromEvent(exampleInput, 'keyup').pipe(
      takeUntil(this.unsubscribe$)
    );
    this.keyup$.subscribe((result) => {
      this.withoutThrottle = this.exampleForm.value.exampleInput;
      console.log('(KEYUP)');
    });
    this.throttled$ = this.keyup$.pipe(
      map((i) => i.currentTarget.value),
      throttleTime(1000),
      takeUntil(this.unsubscribe$)
    );
    this.throttled$.subscribe((val) => console.log(val));
  }
}
