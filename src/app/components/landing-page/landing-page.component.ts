import { Component } from '@angular/core';
import { EventscompComponent } from '../eventscomp/eventscomp.component';
import { TestimonialsComponent } from '../testimonials/testimonials.component';
import { ChatSignalService } from '../../signals/chatsignal.service';
import { NewsletterComponent } from '../newsletter/newsletter.component';
import { Slider } from '../../Models/nav.model';
import { LandingpageService } from '../../Services/landingpage.service';
import { PageService } from '../../Services/page.service';
import { PageData, PageSection, SectionDetail } from '../../Models/page.model';
import { environment } from '../../environment';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [EventscompComponent,TestimonialsComponent,NewsletterComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

  sliderType: number = 1;
  sliders: any[] = [];
  public slidersNew: Slider[] = [];
  loadingContent: boolean = false;
  slidersData!:Slider;
  content!: PageData;
  sectionOne!: PageSection;
  sectionTwo!: SectionDetail;
  sectionThree!: PageSection;


  imageUrl:string = environment.imageUrl;


  constructor(public chatService: ChatSignalService, private _service:LandingpageService,
              private pageService:PageService
  ) {}

  ngOnInit(): void {
    this.getSliders();
    this.getPage();
  }


  openChat() {
    this.chatService.openChat(); // Opens the chat popup
  }

  getSliders(){
    this._service.GetSliderByType(this.sliderType).subscribe((response: Slider[]) => {
      this.slidersNew.push(...response);
      this.slidersData = response[0];
      this.loadingContent = false;
    });
  }

  
  getPage(pageId: number | null =0) {
    this.pageService.getPage(pageId = 0, "home").subscribe((res: any) => {
      console.log("Page Response:", res);
      // this.sliders = [res.bannerImgUrl];
      //this.content = res;
      this.sectionOne = res.sectionsDetailsList.pageSectionInputList[0];
      console.log("sectionOne",this.sectionOne)
      this.sectionTwo =
        res.sectionsDetailsList.pageSectionInputList[1].pageSectionDetailsList[0];
      this.sectionThree = res.sectionsDetailsList.pageSectionInputList[2];
    });
  }



  

}
