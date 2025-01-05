import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { LoginIssueResult } from '../Models/account.model';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private apiService:ApiService) { }

  baseUrl :string = environment.apiUrl;

  register(data:any){
    return this.apiService.post('Account/register', data);
  }

  login(data:any){
    return this.apiService.post( 'Account/login', data);
  }

  public getloggedinUserDetails() {
    return this.apiService.get(`UserDetails/UserClient`);
  }

  public getloggedinUserDetailsById(id:number) {
    return this.apiService.get(`UserDetails/UserClientById/`+id);
  }

  checkLoginIssue(email:string) : Observable<LoginIssueResult> {
    return this.apiService.post("UserDetails/CheckLoginIssue", { email });
  }

  userdetailById(id:number) {
    return this.apiService.get("UserDetails/GetById/"+id);
  }

  updateUserDetailData(data:any) {
    return this.apiService.post("UserDetails/update",data);
  }


  
}
