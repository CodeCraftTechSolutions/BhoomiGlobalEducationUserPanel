import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AdditionalData, PageCategory } from '../Models/nav.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FooterService {

  constructor(private apiService:ApiService) { }

  public footerMenu() : Observable<PageCategory[]>{
    return this.apiService.get('MenuItem/FooterMenu');
  }
  public getDefault() : Observable<AdditionalData>{
    return this.apiService.get('MenuItem/getDefault');
  }

  public footerMenuList(pageCategoryId: number,){
    return this.apiService.post('LLpage/LlPageItem',{
      "pageCategoryId": pageCategoryId,
      "page": 1,
      "pageSize": 100,
     
    });
  }

  public newsLetter(data: any){
    return this.apiService.post('Newsletter/AddToNewsletter', data);
  }
}
