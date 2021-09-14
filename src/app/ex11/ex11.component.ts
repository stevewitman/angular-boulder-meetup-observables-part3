import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { HighlightService } from '../highlight.service';
import { logInConsole } from '../shared/utility';

@Component({
  selector: 'app-ex11',
  templateUrl: './ex11.component.html',
  styleUrls: ['./ex11.component.scss'],
})
export class Ex11Component implements OnInit, AfterViewChecked, OnDestroy {
  active: string = '';
  keyup$!: Observable<any>;
  throttled$!: Observable<any>;
  unsubscribe$ = new Subject();
  withoutThrottle: string = '';
  exampleForm = new FormGroup({
    exampleInput: new FormControl({ value: '', disabled: true }),
  });

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
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
    console.log('unsubscribed');
  }

  exampleReset() {
    this.unsubscribe$.next(true);
    console.log('example reset');
  }

  switchMap1() {
    this.active = 'switchMap1';
    console.clear();
    this.exampleReset();
    this.exampleForm.get('exampleInput')?.reset();
    this.exampleForm.get('exampleInput')?.enable();
    logInConsole('subscribed');

    this.exampleForm.valueChanges
      .pipe(
        switchMap((formValue) =>
          this.http.put('https://jsonplaceholder.typicode.com/posts/1', {
            method: 'PUT',
            body: JSON.stringify({
              id: 1,
              title: formValue,
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
        ),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(
        (saveResult) => console.log('SAVED'),
        (err) => console.log('ERROR')
      );
  }
}
