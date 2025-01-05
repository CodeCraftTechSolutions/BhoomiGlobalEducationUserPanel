import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PageService } from '../../Services/page.service';
import { PageSection } from '../../Models/page.model';
import { environment } from '../../environment';
import { FooterService } from '../../Services/footer-service.service';
import { AdditionalData } from '../../Models/nav.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ContactService } from '../../Services/contact.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {


  sectionOne!: PageSection;
  contactForm!: FormGroup;
  public defaultDatas!: AdditionalData;
  googleMapUrl!: SafeResourceUrl;

  imageUrl:string = environment.apiUrl;
  constructor(private fb: FormBuilder,private pageService:PageService,private sanitizer: DomSanitizer, 
    private footerService: FooterService, private contactService:ContactService,private toastr:ToastrService) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      inquiryType: ['Admission', Validators.required],
      inquiryMessage: ['', Validators.required]
    });
    this.defaultData();
    this.getPage();
  }


  onSubmit(): void {
    if (this.contactForm.valid) {
      this.contactService.add(this.contactForm.value).subscribe({next:(res)=>{
        if(res > 0){
          // alert("Thanks for Contacting Us. Will get you soon.");
          this.toastr.success("Thanks for Contacting Us. Will get you soon.");
          this.contactForm.reset();
        }
        else{
          // alert("Please retry Again.");
          this.toastr.error("Please retry Again.");
        }
      }})
      
    } else {
      console.log('Sorry, Please try Again');
    }
  }

  getPage(pageId: number | null = 0) {
    this.pageService.getPage(pageId = 0, "contact").subscribe((res: any) => {
      this.sectionOne = res.sectionsDetailsList.pageSectionInputList[0];
    });
  }

    defaultData(): void {
      this.footerService.getDefault().subscribe((data: AdditionalData) => {
        this.defaultDatas = data;
        this.googleMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.defaultDatas!.googleMapUrl ?? '');
        // console.log(this.defaultDatas)
      });
    }
  

}
