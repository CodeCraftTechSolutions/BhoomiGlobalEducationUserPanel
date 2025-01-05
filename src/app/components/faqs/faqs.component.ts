import { Component } from '@angular/core';
import { PageService } from '../../Services/page.service';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faqs',
  standalone: true,
  imports: [NgbAccordionModule,CommonModule],
  templateUrl: './faqs.component.html',
  styleUrl: './faqs.component.scss'
})
export class FaqsComponent {
  activeIndex: number = 0;
  faqs!: any[];
  
  constructor(private pageservice: PageService) { }

  ngOnInit(): void {
    this.getFaq();
  }

  // Method to set the active FAQ item
  setActiveIndex(index: number) {
    this.activeIndex = index;
  }


  getFaq(){
    this.pageservice.getFaq().subscribe({
      next: (response) => {
         this.faqs= response;
        //  console.log("datataaa tours", response);
      },
      error: (error) => {
        console.error('Error fetching order details:', error);
      }
    });
  }

  
}

