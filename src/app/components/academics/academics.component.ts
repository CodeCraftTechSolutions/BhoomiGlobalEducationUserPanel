import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { PageSection, SectionDetail } from '../../Models/page.model';
import { environment } from '../../environment';
import { PageService } from '../../Services/page.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-academics',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './academics.component.html',
  styleUrl: './academics.component.css'
})
export class AcademicsComponent {

    academicType:string | null = null;
     sectionOne!: SectionDetail;
     previousUrl: string | null = null;
     currentUrl: string | null = null;
  
    imageUrl:string = environment.imageUrl;

    pageUrl:string ="";

  constructor(private route:ActivatedRoute, private pageService:PageService,private router: Router){
  }

  ngOnInit(){
      // Access the route parameter 'academicType'
      this.route.paramMap.subscribe(params => {
        this.academicType = params.get('academicType');
         this.pageUrl = '/academics/' + (this.academicType ?? '');
        this.getPage(0,this.pageUrl);
      });
      
  }


  getPage(pageId: number | null = 0,pageUrl:string) {
    this.pageService.getPage(pageId = 0,pageUrl).subscribe((res: any) => {
      this.sectionOne = res.sectionsDetailsList.pageSectionInputList[0].pageSectionDetailsList[0];
    });
  }
}
