import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ListingService } from 'src/app/modules/auth/services/listing.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/modules/auth';

@Component({
  selector: 'app-listing-notes-add',
  templateUrl: './listing-notes-add.component.html',
  styleUrls: ['./listing-notes-add.component.scss'],
})
export class ListingNotesAddComponent {
  @Input() listingId: any;
  @Input() notesHidden:any;
  listingNotesData: any;
  noteText: string;
  clickbtn: boolean = false;
  userData:any;
  constructor(
    private listingSevice: ListingService,
    private toastr: ToastrService,private cdr: ChangeDetectorRef ,private authService:AuthService 

  ) {
    var uData = this.authService.userValue;
  if(uData != null){
  this.userData= JSON.parse(uData);
  }}
  ngOnInit() {
    console.log('notesHidden',this.notesHidden)
    this.getListingNotesUsingId(this.listingId);
  }
  OnSaveNotes() {

    if (this.noteText.toString() != '') {
      var data = {
        ListingId: this.listingId,
        Notes: this.noteText.toString(),
        CreatedDate: new Date(),
        UpdateDate: new Date(),
        CreateBy: this.userData.id,
      };
      this.listingSevice.saveListingNotes(data).subscribe(
        (res: any | undefined) => {
          this.noteText="";
          setTimeout(() => {            
          this.getListingNotesUsingId(this.listingId);
          this.toastr.success('Listing notes added successfully');
        },2000)
        },
        (error: any) => {
          this.toastr.error('Something went wrong.Please try again letter');
        }
      );
    }else{
      this.clickbtn =true;
    }
  }
onTextBox(){
  this.clickbtn = false;
}
  getListingNotesUsingId(id: string) {
    this.listingSevice.CallNotListing(this.listingNotesData);
    this.listingSevice
      .getListingNotesUsingLocationId(id)
      .subscribe((data: any | undefined) => {
        this.noteText="";
        this.listingNotesData = data;
       this.cdr.detectChanges();
         this.listingSevice.CallNotListing(this.listingNotesData);
      });
  }
}
