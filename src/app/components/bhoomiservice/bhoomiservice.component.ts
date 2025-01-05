import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PageSection, SectionDetail } from '../../Models/page.model';
import { PageService } from '../../Services/page.service';
import { environment } from '../../environment';

@Component({
  selector: 'app-bhoomiservice',
  standalone: true,
  imports: [NgIf,CommonModule,RouterModule],
  templateUrl: './bhoomiservice.component.html',
  styleUrl: './bhoomiservice.component.scss'
})
export class BhoomiserviceComponent {

    sectionOne!: SectionDetail;
    sectionTwo!: PageSection;
    sectionThree!: PageSection;
    sectionFour!: PageSection; 

  serviceName:string |undefined | null = "";
    imageUrl:string = environment.imageUrl;

    pageUrl:string ="";

  constructor(private route: ActivatedRoute,private pageService:PageService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.serviceName = params.get('serviceName') || '';
      this.pageUrl = '/service/' + (this.serviceName ?? '');
      this.getPage(0,this.pageUrl);
    });
  }

  getPage(pageId: number | null = 0,name:string) {
    this.pageService.getPage(pageId = 0, name).subscribe((res: any) => {
      this.sectionOne = res.sectionsDetailsList.pageSectionInputList[0].pageSectionDetailsList[0];
      this.sectionTwo =
        res.sectionsDetailsList.pageSectionInputList[1];
      this.sectionThree = res.sectionsDetailsList.pageSectionInputList[2];
      this.sectionFour = res.sectionsDetailsList.pageSectionInputList[3];
    });
  }



}
