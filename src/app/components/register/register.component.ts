import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../Services/account.service';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { environment } from '../../environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {


  registerForm: FormGroup;
  loading:boolean = false;
  imageUrl:string = environment.imageUrl

  constructor(private fb: FormBuilder, private _service:AccountService, private router:Router,
              private authService: AuthService, private toastr:ToastrService
  ) {

      // Initialize the register form with validation rules
      this.registerForm = this.fb.group({
        fName: ['', [Validators.required, Validators.minLength(2)]],  // First name with min length
        lName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, this.confirmPasswordwordValidator.bind(this)]],
        phoneNumber: ['', [Validators.required, Validators.pattern('^\\+?\\d{1,4}?\\s?-?\\(?\\d{1,3}?\\)?\\s?-?\\d{1,4}\\s?-?\\d{1,4}\\s?-?\\d{1,9}$')]],
        gender: ['', Validators.required],
        age: ['', [Validators.required, Validators.min(18), Validators.max(120)]],  // Age validation
        address: ['', [Validators.required, Validators.minLength(10)]] 
      });
   }

  ngOnInit(): void {
  
  }

  confirmPasswordwordValidator(control: any): { [key: string]: boolean } | null {
    if (this.registerForm && control.value !== this.registerForm.get('password')?.value) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

 
  onSubmit(): void {
    if (this.registerForm.valid) {
      debugger
      this._service.register(this.registerForm.value).subscribe({next:(res)=>{
        // alert("Registered Successfully.")
        this.toastr.success("Registered Successfully.")
        this.router.navigateByUrl('/signin');
      },
    error:(err)=>[
      // alert("Failed to Register. Please retry Again.")
      this.toastr.error("Failed to Register. Please retry Again.")
    ]})
      // Perform login operation here
    } else {
      // alert("Please Enter the valid data");
      this.toastr.error("Please Enter the valid data");
    }
  }

  processresponse(x: any) {
    localStorage.setItem("token", x.access_token);
    this.authService.loggedIn.next(true);
    this.loading = false;
    this._service.getloggedinUserDetails().subscribe(
      (x: any) => {
        if (x.imagePath && x.imagePath !== "") {
          x.imagePath = this.imageUrl + x.imagePath;
        } else {
          x.imagePath = "";
        }
        localStorage.setItem("user", JSON.stringify(x));
        const user = JSON.parse(localStorage.getItem("user") ?? "");
        let username = user.firstName !== "" ? user.firstName : user.email;
        this.authService.user.next(username);
        this.authService.userImage.next(x.imagePath);
      },
      (err) => {
        this.authService.user.next("");
        this.authService.userImage.next("");
        localStorage.setItem("user", "");
      }
    );
  }

  showpassword() {
    let x: any = document.getElementById("pwd");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
  // hideForgootPasswordDiv() {
  //   this.showForgotPassword = false;
  // }


}
