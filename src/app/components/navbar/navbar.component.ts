import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { MenuComponent } from '../menu/menu.component';
import { AdditionalData } from '../../Models/nav.model';
import { FooterService } from '../../Services/footer-service.service';
import { environment } from '../../environment';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterModule,MenuComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

    signintext: string | null = null;
    isHide:boolean = false;
    menus = [
      { title: 'Home', path: '/', active: false },
      { title: 'Pages', path: '#', active: false, children: [{ title: 'About Us', path: '/about' }] }, //{ title: 'Services', path: '/services' }
      { title: 'Academics', path: '#', active: false, children: [{ title: 'Undergraduate', path: 'academics/undergraduate' }, { title: 'Postgraduate', path: 'academics/postgraduate' }] },
      { title: 'Contact', path: '/contact', active: false },
      { title: 'Signin', path:'/signin', active: false }
    ];
  
    // Variable to control navbar menu toggle
    isMenuOpen = false;
    isSearchVisible = false;
    isOffcanvasOpen = false;
    activeAccordion = '';
    imageUrl:string = environment.imageUrl;
      
    constructor(private router:Router,   private footerService: FooterService,) {}
    public defaultDatas!: AdditionalData;
    hover: boolean = false;  // Track hover state
    ngOnInit(): void {
     
      if(localStorage.getItem("name")!= null || localStorage.getItem("name") != ""){
        this.signintext = localStorage.getItem('name');
        this.isHide = true;
      }
      this.defaultData();
    }
  
    defaultData(): void {
      this.footerService.getDefault().subscribe((data: AdditionalData) => {
        this.defaultDatas = data;
      });
    }

    onHover(isHovered: boolean): void {
      this.hover = isHovered;
    }

    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    }
  
    toggleSearch() {
      this.isSearchVisible = !this.isSearchVisible;
    }
  
    closeSearch() {
      this.isSearchVisible = false;
    }

    toggleOffcanvasMenu() {
      this.isOffcanvasOpen = !this.isOffcanvasOpen;
    }
  
    // Method to set active accordion item
    toggleAccordion(id: string) {
      this.activeAccordion = this.activeAccordion === id ? '' : id;
    }

    onLogoutClick(): void {
      localStorage.clear();
      alert("Logged out successfully.");
      //this.router.navigateByUrl('/signin');
      window.location.href = '/login'; 
    }

}
