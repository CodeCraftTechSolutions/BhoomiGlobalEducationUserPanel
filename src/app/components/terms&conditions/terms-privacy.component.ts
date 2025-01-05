import { Component } from '@angular/core';
import { PageSection, SectionDetail } from '../../Models/page.model';
import { environment } from '../../environment';
import { PageService } from '../../Services/page.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-terms-privacy',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './terms-privacy.component.html',
  styleUrl: './terms-privacy.component.scss'
})
export class TermsPrivacyComponent {


      sectionOne!: SectionDetail;
      sectionTwo!: SectionDetail;
      sectionThree!: PageSection;
      sectionFour!: SectionDetail; 
  
    serviceName:string |undefined | null = "";
      imageUrl:string = environment.imageUrl;
  
      pageUrl:string ="";
  
    constructor(private pageService:PageService) {}
  
    ngOnInit(): void {
      this.getPage(0,'termsOfServices');
    }
  
    getPage(pageId: number | null = 0,name:string) {
      this.pageService.getPage(pageId = 0, name).subscribe((res: any) => {
        this.sectionOne = res.sectionsDetailsList.pageSectionInputList[0].pageSectionDetailsList[0];
        this.sectionTwo =res.sectionsDetailsList.pageSectionInputList[1].pageSectionDetailsList[0];
        this.sectionThree = res.sectionsDetailsList.pageSectionInputList[2];
        this.sectionFour = res.sectionsDetailsList.pageSectionInputList[3].pageSectionDetailsList[0];
      });
    }

}
