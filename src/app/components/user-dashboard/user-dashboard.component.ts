import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../Services/account.service';
import { NewsletterserviceService } from '../../Services/newsletterservice.service';
import { DashboardSidebarComponent } from '../dashboard-sidebar/dashboard-sidebar.component';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [DashboardSidebarComponent, RouterModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {

  ToggleInfo() {
    throw new Error("Method not implemented.");
  }

  public openInfo: boolean = false;
  public userDetails: any = {}; 
  public isEditing: boolean = false; 
  isNewLetterSubscribe:boolean =true;
  username:string | null  | undefined = "";
  userDetailId:number |undefined = 0;


  constructor(private router: Router,private _Service: AccountService,private tostr: ToastrService, private newsletterService: NewsletterserviceService) {}

  ngOnInit(): void {
    this.getDashboard();

    this.username = localStorage.getItem("userName")?.toString();
    this.userDetailId = Number(localStorage.getItem("userDetailId")?? 0);
    if(this.userDetailId > 0) this.getUserdetailsData();
  }

  ToggleDashboard() {
    this.openInfo = !this.openInfo;
  }

  getDashboard() {
    this._Service.getloggedinUserDetails().subscribe({
      next: (response: any) => {
        this.userDetails = response;
      },
      error: (err:any) => {
        console.error("Failed to fetch dashboard details", err);
      },
    });
  }

  getUserdetailsData(){
    this._Service.getloggedinUserDetailsById(this.userDetailId ?? 0).subscribe({next:(res:any)=>{
      this.userDetails = res;
    }})
  }

  editContactInformation() {
    this.isEditing = true;  
  }

  saveContactInformation() {
    this.isEditing = false; 
    console.log("Updated contact info:", this.userDetails);
  }

  cancelEdit() {
    this.isEditing = false;  
  }

  subscribe() {
    const data = { firstName: this.userDetails.firstName, lastName: this.userDetails.lastName, emailAddress: this.userDetails.userName };
    this.newsletterService.subscribeToNewsletter(data).subscribe((x: any) => {
      this.tostr.success(x.message);
      this.isNewLetterSubscribe = true;
    }, (err:any) => {
      this.tostr.error(err.error);
    });
  }
  
  unsubscribe() {
    this.newsletterService.deleteNewsletterSubscribersByEmail(this.userDetails.userName).subscribe((x:any) => {
      this.isNewLetterSubscribe = false;
      this.tostr.success("Email is unsubscribed to newsletters.");
    });
  }


}
