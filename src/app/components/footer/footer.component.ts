import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AdditionalData, Menu, PageCategory } from '../../Models/nav.model';
import { FooterService } from '../../Services/footer-service.service';
import { CommonModule } from '@angular/common';
import { NavService } from '../../Services/nav.service';
import { environment } from '../../environment';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  
  public menuItems: PageCategory[] = [];
  public defaultDatas!: AdditionalData;
  public imageUrl:string = environment.imageUrl;
  

  constructor(
    private footerService: FooterService,
    private fb: FormBuilder,
    // private alertyfy: ,
    private router: Router,
      public navServices: NavService
  ) {

  }

  ngOnInit(): void {
    this.footerMenu();
    this.defaultData();
  }
  

  footerMenu(): void {
    this.footerService.footerMenu().subscribe((menuItems: PageCategory[]) => {
      this.menuItems = menuItems;
      // console.log(this.menuItems)
    });
  }

  defaultData(): void {
    this.footerService.getDefault().subscribe((data: AdditionalData) => {
      this.defaultDatas = data;
      // console.log(this.defaultDatas)
    });
  }



  routeMenu(item:any, nestedMenu:any){
    this.router.navigateByUrl(nestedMenu?.codeUrl).then(()=>{
      const element = document.getElementById('services');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }


}
