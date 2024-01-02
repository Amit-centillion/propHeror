import { Component, Input } from '@angular/core';
import { ListingService } from 'src/app/modules/auth/services/listing.service';
import {ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'app-listing-notes',
  templateUrl: './listing-notes.component.html',
  styleUrls: ['./listing-notes.component.scss'],
})
export class ListingNotesComponent {
  @Input() notesData:any;
  constructor(private listingSevice: ListingService,private cd : ChangeDetectorRef) {
    }  
  ngOnInit() {
       
  }
}
