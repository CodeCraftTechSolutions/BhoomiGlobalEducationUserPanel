import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../Services/account.service';
import { Router } from '@angular/router';
import ls from 'localstorage-slim';
import { AuthService } from '../../Services/auth.service';
import { environment } from '../../environment';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { LoginIssueResult } from '../../Models/account.model';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,NgIf],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements OnInit{


  loginForm: FormGroup;
  loading:boolean = false;
  imageUrl:string = environment.imageUrl;

  constructor(private fb: FormBuilder, private _service:AccountService, private router:Router,
              private authService: AuthService, public toastr: ToastrService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
   }

  ngOnInit(): void {
    
  }

  get f() { return this.loginForm.controls; }

  // onSubmit(): void {
  //   if (this.loginForm.valid) {
  //     this._service.login(this.loginForm.value).subscribe({next:(res:any)=>{
  //       localStorage.setItem("name",res.username)
  //       alert("Logged In Successfully.");
  //       window.location.href = '/'; 
  //     },
  //   error:(err)=>[
  //     alert("Failed to Login. Please Check your Credentials.")
  //   ]})
  //     // Perform login operation here
  //   } else {
  //     alert("Please Enter the data");
  //   }
  // }


  processresponse(x: any) {
    ls.set('token', x.access_token);
    ls.set('userName', x.userName);
    ls.set('userDetailId', x.userDetailId);
    this.authService.loggedIn.next(true);
    this.loading = false;
    return this._service.getloggedinUserDetailsById(x.userDetailId).subscribe((x: any) => {
        if (x.imagePath && x.imagePath !== '') {
          x.imagePath = this.imageUrl + x.imagePath;
        } else {
          x.imagePath = '';
        }
        ls.set('user', JSON.stringify(x));
        const user = JSON.parse(ls.get('user') ?? "");
        let username = user.firstName !== '' ? user.firstName : user.email;
        this.authService.user.next(username);
        this.authService.userImage.next(x.imagePath);
      }, err => {
        this.authService.user.next('');
        this.authService.userImage.next('');
        ls.set('user', null);
      })
  }

  onSubmit():void{
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this._service.login(this.loginForm.value).subscribe((x: any) => {
      // if(x.token != '' &&   (x.role == 'General Member' || x.role == 'Agent Member')){
      if(x.token != ''){
      this.processresponse(x);
      this.toastr.success("Successfully LoggedIn");
      this.router.navigateByUrl('/');
  
   
      }
      else if(x.block==1){
        this.loading = false;
        this.toastr.error('User is locked. Please contact system administrator.');
      }
      else if(x.isInvalid){
        this.loading = false;
        this.toastr.error(x.msg);
      }
      else{
        this.loading = false;
        this.toastr.error('Username or Password does not match.');
        this.router.navigateByUrl('/');
      }
      
    }, err => {
      
      if(err != null && err.error != null && err.error.error != null){
        this._service.checkLoginIssue(this.f['email'].value).subscribe((result:LoginIssueResult) => {
          var message = 'Username or Password does not match.';
          if(result.code == "user_locked_out"){
            message = "User is locked. Please contact system administrator.";
          } else if(result.code == "email_not_confirmed"){
            message = "Email has not been verified. Please check inbox.";
          }

          this.loading = false;
          this.toastr.error('Username or Password does not match.');
        }
      );
  }
  });
  }
}
