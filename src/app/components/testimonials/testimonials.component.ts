import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { PageService } from '../../Services/page.service';
import { PageSection, SectionDetail } from '../../Models/page.model';
import { environment } from '../../environment';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CarouselModule,CommonModule],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css'
})
export class TestimonialsComponent {

  itemsToShow: number = 1;
  sectionOne!:PageSection;
  bannerImage:string = environment.imageUrl;
  imageUrl:string = environment.imageUrl;
  title!:string;
   
  constructor(private pageService:PageService) {}
      
  ngOnInit(): void {
    this.getPage(0,'testimonials');
  }

  getPage(pageId: number | null = 0,name:string) {
    this.pageService.getPage(pageId = 0, name).subscribe((res: any) => {
      this.sectionOne = res.sectionsDetailsList.pageSectionInputList[0];
      this.bannerImage += res.bannerImgUrl;
      this.title = res.title;
    });
  }     


}
