import { Component ,Input,Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.scss']
})
export class TextboxComponent {
  @Input() formControlName:any;
  @Input() placeholder:any;
  @Input() type:any;
  @Input() disabled:boolean=false;
  @Input() field:any;
  @Output() valueChange : EventEmitter<any> =new EventEmitter();
  valueChanged( $event:any){
    this.valueChange.emit( $event);
  }
}
