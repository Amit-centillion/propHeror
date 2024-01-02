import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { getCSSVariableValue } from 'src/app/_metronic/kt/_utils';
@Component({
  selector: 'app-leads-conversion',
  templateUrl: './leads-conversion.component.html'
})
export class LeadsConversionComponent implements OnInit,OnChanges {

 @Input() chartOptions: any = {};

  constructor(private cdr: ChangeDetectorRef) {}
  ngOnChanges(changes: SimpleChanges): void {
    window.dispatchEvent(new Event("resize"));
  }

  ngOnInit(): void {

  }
}



