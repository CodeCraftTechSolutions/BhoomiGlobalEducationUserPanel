import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private apiservice:ApiService) { }

  add(data:any){
    return this.apiservice.post('Contact/Create',data);
  }
}
