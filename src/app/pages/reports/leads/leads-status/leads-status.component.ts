import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { getCSSVariableValue } from 'src/app/_metronic/kt/_utils';

@Component({
  selector: 'app-leads-status',
  templateUrl: './leads-status.component.html'
})

export class LeadsStatusComponent implements OnInit,OnChanges {

  @Input() chartOptions: any = {};

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
    
  }
}



