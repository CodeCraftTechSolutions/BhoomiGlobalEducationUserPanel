import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FooterService } from '../../Services/footer-service.service';
import { PageService } from '../../Services/page.service';
import { environment } from '../../environment';
import { SectionDetail } from '../../Models/page.model';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,ToastrModule],
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.scss'
})
export class NewsletterComponent {

  newsLetterForm!: FormGroup;
  sectionOne!: SectionDetail;
  
  imageUrl:string = environment.imageUrl;

    constructor(private fb: FormBuilder, private toastr:ToastrService, private _service:FooterService,
                private pageService:PageService){}

    ngOnInit(){
      this.newsLetterForm = this.fb.group({
        emailAddress: ['', [Validators.required, Validators.email]]
      });
      this.getPage();
    }

    onSubmit() {
      this.toastr.success("he")
      const data = {
        emailAddress: this.newsLetterForm.value.emailAddress,
      };
  
      this._service.newsLetter(data).subscribe((res: any) => {
         this.toastr.success(res.message);
        this.newsLetterForm.reset();
      });
    }

    getPage(pageId: number | null = 0) {
      this.pageService.getPage(pageId = 0, "newsletter").subscribe((res: any) => {
        this.sectionOne = res.sectionsDetailsList.pageSectionInputList[0].pageSectionDetailsList[0];
      });
    }
}
