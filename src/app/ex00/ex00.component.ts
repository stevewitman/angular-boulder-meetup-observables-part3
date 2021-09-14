import { Component, OnInit } from '@angular/core';
import { interval, Observable, timer } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-ex00',
  templateUrl: './ex00.component.html',
  styleUrls: ['./ex00.component.scss']
})
export class Ex00Component implements OnInit {
  obs1$: Observable<number> | undefined;

  constructor() { }

  ngOnInit(): void {

    this.obs1$ = timer(2500);
    this.obs1$.pipe(
      // take(3)
    ).subscribe(val => console.log(val));

  }

}
