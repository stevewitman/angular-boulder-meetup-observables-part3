import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { pluck, tap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

import { HighlightService } from '../highlight.service';

@Component({
  selector: 'app-ex04',
  templateUrl: './ex04.component.html',
  styleUrls: ['./ex04.component.scss'],
})
export class Ex04Component implements OnInit {
  active: string = '';
  val: any;

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

  ajax1() {
    this.active = 'ajax1';
    console.clear();
    ajax('https://jsonplaceholder.typicode.com/users')
      .pipe(
        tap(val => this.val = val)
      )
      .subscribe(console.log);
  }

  ajaxPluck1() {
    this.active = 'ajaxPluck1';
    console.clear();
    ajax('https://jsonplaceholder.typicode.com/users')
      .pipe(
        pluck('response'),
        tap((val) => (this.val = val))
      )
      .subscribe(console.log);
  }

  logInConsole(val: string) {
    console.log(
      `%c ${val} emits ... `,
      'background: #ADFF2F66; font-weight: bold; border-radius: 3px;'
    );
  }
}
