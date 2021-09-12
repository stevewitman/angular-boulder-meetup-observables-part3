import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { fromEvent, Observable, Subject } from 'rxjs';
import { debounceTime, map, takeUntil, tap } from 'rxjs/operators';

import { HighlightService } from '../highlight.service';
import { logInConsole } from '../shared/utility';

@Component({
  selector: 'app-ex03',
  templateUrl: './ex03.component.html',
  styleUrls: ['./ex03.component.scss'],
})
export class Ex03Component implements OnInit, AfterViewChecked, OnDestroy {
  active: string = '';
  keyup$!: Observable<any>;
  debounced$!: Observable<any>;
  unsubscribe$ = new Subject();
  withoutDebounce: string = '';
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

  debounce1() {
    this.active = 'debounce1';
    console.clear();
    this.exampleReset();
    this.withoutDebounce = '';
    this.exampleForm.get('exampleInput')?.reset();
    this.exampleForm.get('exampleInput')?.enable();
    logInConsole('subscribed');
    const exampleInput = document.getElementById('exampleInput')!;

    this.keyup$ = fromEvent(exampleInput, 'keyup').pipe(
      takeUntil(this.unsubscribe$)
    );
    this.keyup$.subscribe(result => {
      this.withoutDebounce = this.exampleForm.value.exampleInput;
      console.log('(KEYUP)');
    });
    this.debounced$ = this.keyup$.pipe(
      map((i) => i.currentTarget.value),
      debounceTime(500),
      takeUntil(this.unsubscribe$)
    );
    this.debounced$.subscribe(val => console.log(val));
  }
}
