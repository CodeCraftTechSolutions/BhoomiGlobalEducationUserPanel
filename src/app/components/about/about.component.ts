import { Component } from '@angular/core';
import { PageService } from '../../Services/page.service';
import { PageData, PageSection, SectionDetail } from '../../Models/page.model';
import { environment } from '../../environment';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

    content!: PageData;
    sectionOne!: SectionDetail;
    sectionTwo!: PageSection;
    sectionThree!: PageSection;
    sectionFour!: PageSection;

    imageUrl:string = environment.imageUrl;

    constructor(private pageService:PageService
    ) {}
    
    
    ngOnInit(){
      this.getPage();
    }
    
    getPage(pageId: number | null = 0) {
      this.pageService.getPage(pageId = 0, "about").subscribe((res: any) => {
        console.log("Page Response:", res);
        this.content = res;
        this.sectionOne = res.sectionsDetailsList.pageSectionInputList[0].pageSectionDetailsList[0];
        this.sectionTwo =
          res.sectionsDetailsList.pageSectionInputList[1];
        this.sectionThree = res.sectionsDetailsList.pageSectionInputList[2];
        console.log(this.sectionThree!.pageSectionDetailsList[2]?.iconUrl)
        this.sectionFour = res.sectionsDetailsList.pageSectionInputList[3];
      });
    }
}
