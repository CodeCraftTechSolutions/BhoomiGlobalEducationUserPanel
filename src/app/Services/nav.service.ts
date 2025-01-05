import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  constructor(private apiService:ApiService) { }

  public headerMenu(){
    return this.apiService.get('MenuItem/HeaderMenuNew');
  }
  public headerMenuList(pageCategoryId: number,){
    return this.apiService.post('LLpage/LlPageItem',{
      "pageCategoryId": pageCategoryId,
      "page": 1,
      "pageSize": 100,
     
    });
  }

  public getOnlyparentCategory(){
    return this.apiService.get('Category/OnlyParents');
   }
}
