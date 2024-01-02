import { Component ,Input} from '@angular/core';

@Component({
  selector: 'app-dropdown-select',
  templateUrl: './dropdown-select.component.html',
  styleUrls: ['./dropdown-select.component.scss']
})
export class DropdownSelectComponent {
@Input() selected:any = "";
@Input() list:any;
@Input() name:any;
}
