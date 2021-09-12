import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { of, from, Observable, Subject } from 'rxjs';
import { distinct, map } from 'rxjs/operators';

import { HighlightService } from '../highlight.service';
import { logInConsole } from '../shared/utility';

@Component({
  selector: 'app-ex06',
  templateUrl: './ex06.component.html',
  styleUrls: ['./ex06.component.scss'],
})
export class Ex06Component implements OnInit, AfterViewChecked, OnDestroy {
  active: string = '';
  unsubscribe$ = new Subject();

  bestSellingCars = [
    { rank: '1', make: 'Ford', model: 'F-Series' },
    { rank: '2', make: 'Ram', model: 'Pickup' },
    { rank: '3', make: 'Chevorlet', model: 'Silverado' },
    { rank: '4', make: 'Toyota', model: 'RAV4' },
    { rank: '5', make: 'Honda', model: 'CR-V' },
    { rank: '6', make: 'Nissan', model: 'Rouge' },
    { rank: '7', make: 'Toyota', model: 'Camary' },
    { rank: '8', make: 'Toyota', model: 'Corolla' },
    { rank: '9', make: 'Honda', model: 'Civic' },
    { rank: '10', make: 'Toyota', model: 'Highlander' },
  ];

  constructor(private highlightService: HighlightService) {}

  ngOnInit(): void {
    console.clear();
  }

  ngAfterViewChecked() {
    this.highlightService.highlightAll();
  }

  ngOnDestroy() {}

  distinct1() {
    this.active = 'distinct1';
    console.clear();
    logInConsole('subscribed');
    of('none', 'none', 'dog', 'dog', 'cat', 'dog', 'fish', 'dog', 'cat')
      .pipe(distinct())
      .subscribe((val) => console.log(val));
  }

  distinct2() {
    this.active = 'distinct2';
    console.clear();
    logInConsole('subscribed');
    from(this.bestSellingCars).pipe(distinct()).subscribe(console.log);
  }

  distinct3() {
    this.active = 'distinct3';
    console.clear();
    logInConsole('subscribed');

    from(this.bestSellingCars)
      .pipe(
        distinct(car => car.make)
      )
      .subscribe(console.log);
  }

  distinct4() {
    this.active = 'distinct4';
    console.clear();
    logInConsole('subscribed');

    from(this.bestSellingCars)
      .pipe(
        distinct(car => car.make),
        map(car => car.make)
      )
      .subscribe(console.log);
  }

  distinct5() {
    this.active = 'distinct5';
    console.clear();
    logInConsole('subscribed');

    from(this.bestSellingCars)
      .pipe(
        map(car => car.make)
      )
      .subscribe(console.log);
  }

  distinct6() {
    this.active = 'distinct6';
    console.clear();
    logInConsole('subscribed');

    from(this.bestSellingCars)
      .pipe(
        map(car => car.make),
        distinct()
      )
      .subscribe(console.log);
  }
}


