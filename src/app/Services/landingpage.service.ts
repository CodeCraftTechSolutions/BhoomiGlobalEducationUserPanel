import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class LandingpageService {

  constructor(private apiService:ApiService) { }

  public GetSliderByType(typeId: number){
    return this.apiService.get('Carousel/SlidersByType?sliderType=' + typeId);
  }
}
