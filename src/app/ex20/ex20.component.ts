import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';

import { concatMap, filter, tap } from 'rxjs/operators';
import { from, Observable, of, Subscription } from 'rxjs';

import { HighlightService } from '../highlight.service';

@Component({
  selector: 'app-ex10',
  templateUrl: './ex10.component.html',
  styleUrls: ['./ex10.component.scss'],
})
export class Ex10Component implements OnInit, OnDestroy {
  active: string = '';
  val: any;
  subscriptions = new Subscription();
  todosForm = new FormGroup({
    title: new FormControl(),
  });

  constructor(
    private highlightService: HighlightService,
    private http: HttpClient,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  ngAfterViewChecked() {
    this.highlightService.highlightAll();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  createForm() {
    this.todosForm = this.fb.group({
      title: '',
    });
  }

  saveTodo(title: string): Observable<any> {
    return from(
      fetch(`https://jsonplaceholder.typicode.com/todos/5?_delay=2000`, {
        method: 'PUT',
        body: JSON.stringify({ title }),
        headers: { 'content-type': 'application/json' },
      })
    );
  }

  concatMap1() {
    this.active = 'concatMap1';
    console.clear();

    this.logInConsole('Enter text in form field');

    this.todosForm.valueChanges
      .pipe(
        filter(() => this.todosForm.valid),
        concatMap((changes) => this.saveTodo(changes.title))
      )
      .subscribe();
  }

  logInConsole(val: string) {
    console.log(
      `%c ${val}`,
      'background: #ADFF2F66; font-weight: bold; border-radius: 3px;'
    );
  }
}

// https://www.youtube.com/watch?v=oNf-PdXzKhw
