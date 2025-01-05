import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsletterserviceService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public checkEmailAddress(email:string){
    return this.http.get(this.baseUrl + "Newsletter/IsEmailSubscribed?email=" + email);
  }

  public subscribeToNewsletter(body:any){
    return this.http.post(this.baseUrl + "Newsletter/AddToNewsletter", body);
  }

  public deleteNewsletterSubscribersByEmail(email:string){
    return this.http.delete(this.baseUrl+ 'Newsletter/DeleteNewsletterSubscribersByEmail/'+email);
  }
}
