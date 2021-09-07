import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, switchMap, take, tap } from 'rxjs/operators';

import { HighlightService } from '../highlight.service';
import { interval, of, timer } from 'rxjs';

@Component({
  selector: 'app-ex03',
  templateUrl: './ex03.component.html',
  styleUrls: ['./ex03.component.scss'],
})
export class Ex03Component implements OnInit {
  active: string = '';
  val: any;

  constructor(
    private highlightService: HighlightService,
    private http: HttpClient
  ) {}

  

  ngOnInit(): void {
    console.clear();
    let srcObservable= interval(1000).pipe(
      take(4)
    )
let innerObservable= interval(400).pipe(
      take(4)
    )
 
srcObservable.pipe(
  switchMap( val => {
    console.log('Source value '+val)
    console.log('starting new observable')
    return innerObservable
  })
)
.subscribe(ret=> {
  console.log('Recd ' + ret);
})
  }

  ngAfterViewChecked() {
    this.highlightService.highlightAll();
  }

  pipeTap1() {
    this.val = null;
    this.active = 'pipeTap1';
    console.clear();
    this.logInConsole('Tap and console.log ...');
    this.http
      .get('https://jsonplaceholder.typicode.com/users')
      .pipe(
        tap(val => console.log('DATA:', val)),
      )
      .subscribe();
  }

  pipeTap2() {
    this.active = 'pipeTap2';
    console.clear();
    this.logInConsole('See result in the browser');
    this.http
      .get('https://jsonplaceholder.typicode.com/users')
      .pipe(
        tap(val => this.val = val)
      )
      .subscribe();
  }

  pipeTapMap3() {
    this.active = 'pipeTapMap3';
    console.clear();
    this.logInConsole('See result in the browser');
    this.http
      .get('https://jsonplaceholder.typicode.com/users')
      .pipe(
        map((res: any) =>
          res.map((data: any) => {
            return {
              id: data.id,
              name: data.name,
            };
          })
        ),
        tap((val) => (this.val = val))
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
