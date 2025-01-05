import { Component } from '@angular/core';
import { environment } from '../../environment';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../Services/auth.service';
import { DashboardSidebarComponent } from '../dashboard-sidebar/dashboard-sidebar.component';
import { AccountService } from '../../Services/account.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-account',
  standalone: true,
  imports: [DashboardSidebarComponent, FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './user-account.component.html',
  styleUrl: './user-account.component.scss'
})
export class UserAccountComponent {


  userForm!: FormGroup;
  isSubmitted: boolean = false;
  userDetailId:number = 0;

  constructor(private fb: FormBuilder, private _service:AccountService, private toastr:ToastrService) {}

  ngOnInit(): void {
    this.userDetailId = Number(localStorage.getItem("userDetailId") ?? 0);
    if(this.userDetailId > 0) this.getUserDetailById();
    this.initializeForm();

  }

  


  getUserDetailById(){
    this._service.userdetailById(this.userDetailId).subscribe({next:(res:any)=>{
      this.userForm.patchValue(res);
    },
  error:(err:any)=>{
    console.log(err)
  }})
  }

  // Initialize the form with fields and default values
  initializeForm(): void {
    this.userForm = this.fb.group({
      id:this.userDetailId,
      fName: ['', Validators.required],
      lName: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
      email: [{value:'', disabled:true}],
      gender: ['', Validators.required],
      address: [''],
    });
  }

  // Update the form and simulate saving
  updateProfile(): void {
    this.isSubmitted = true;
    if (this.userForm.valid) {
      this._service.updateUserDetailData(this.userForm.value).subscribe({next:(res:boolean)=>{
        if(res){
          this.toastr.success("Updated Successfully.");
          // alert("Updated Successfully.")
          this.toastr.success("Updated Successfully.")
          localStorage.setItem("userName", this.userForm.value.fName + " " + this.userForm.value.lName)
        }else{
          this.toastr.error("Something went wrong.")
          // alert("Something went wrong.")
        }
      }})
    } else {
      this.toastr.error('Please fill out the form correctly!');
      // alert('Please fill out the form correctly!');
    }
  }
}
