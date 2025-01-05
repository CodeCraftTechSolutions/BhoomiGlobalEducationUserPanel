import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { PageData } from '../Models/page.model';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(private apiService: ApiService) { }

  getPage(id?: number, code?: string): Observable<PageData> {
    return this.apiService.get("page/getbyIdorCode", {
      id,
      code,
    });
  }

  public getFaq(){
    return this.apiService.get('Page/FAQ');
  }
}
