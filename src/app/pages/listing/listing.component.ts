import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListingService } from 'src/app/modules/auth/services/listing.service';
import { Router } from '@angular/router';
import { NgSelectConfig } from '@ng-select/ng-select';


type Tabs = 'Sidebar' | 'Header' | 'Toolbar';

@Component({
  selector: 'app-lising',
  templateUrl: './listing.component.html',
})
export class ListingComponent implements OnInit {

 
  ngOnInit(): void {
  
  }constructor(private config: NgSelectConfig,
    private listingSevice: ListingService,
    private router: Router) {this.config.notFoundText = 'Custom not found';
    this.config.appendTo = 'body';
    // set the bindValue to global config when you use the same 
    // bindValue in most of the place. 
    // You can also override bindValue for the specified template 
    // by defining `bindValue` as property
    // Eg : <ng-select bindValue="some-new-value"></ng-select>
    this.config.bindValue = 'value';}

goToAdd(){
  this.router.navigate(['/listings/add'])
}
 
}