import { Component } from '@angular/core';
import { PageSection, SectionsDetailsList } from '../../Models/page.model';
import { PageService } from '../../Services/page.service';
import { environment } from '../../environment';

@Component({
  selector: 'app-eventscomp',
  standalone: true,
  imports: [],
  templateUrl: './eventscomp.component.html',
  styleUrl: './eventscomp.component.css'
})
export class EventscompComponent {


  fetauredPageList!:SectionsDetailsList;
  eventPageList!:SectionsDetailsList;

  imageUrl:string = environment.imageUrl;


  constructor(private pageService:PageService){}

  ngOnInit():void {
    this.getEventsPage();
    this.getFeaturePage();
  }

  getFeaturePage(pageId: number | null = 0) {
    this.pageService.getPage(pageId = 0, "news").subscribe((res: any) => {  
      this.fetauredPageList= res?.sectionsDetailsList;
    });
  }

  getEventsPage(pageId: number | null = 0) {
    this.pageService.getPage(pageId = 0, "events").subscribe((res: any) => {
      this.eventPageList = res?.sectionsDetailsList;
    });
  }

}
