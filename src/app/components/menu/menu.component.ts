import { Component, HostListener } from '@angular/core';
import { environment } from '../../environment';
import { Menu } from '../../Models/nav.model';
import { Router, RouterModule } from '@angular/router';
import { NavService } from '../../Services/nav.service';
import { AuthService } from '../../Services/auth.service';
import { AccountService } from '../../Services/account.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MenuCategoryEnum } from '../../../Enums/enums';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule,CommonModule, NgIf, NgFor],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {


  isLoggedIn:boolean = false;
  userimage: string = "";
  username: string = "";
  imageUrl: string = environment.imageUrl;
  isAffiliate: boolean = false;
  userDetailId : number | undefined = 0;

  // New property to manage menu visibility
  public isMenuVisible: boolean = false;

  public menuItems: Menu[] = [];
  isAcademicsOpen: boolean = false;

  dynamicMenus :any[] = [];

  activeDropdown: string | null = null; // Tracks which dropdown is open

  constructor(
    private router: Router,
    public navServices: NavService,
    public authService: AuthService,
    private accountService:AccountService
  ) {
  }

  ngOnInit(): void {
    this.fetchMenu();
    this.authService.isLoggedIn.subscribe((x) => (this.isLoggedIn = x));
    this.authService.isLoggedIn.subscribe((x) => {
      this.isLoggedIn = x;
      if (this.isLoggedIn) {
        this.userDetails();
      }
    });

    this.userDetailId = Number(localStorage.getItem("userDetailId") ?? 0);
    if(this.userDetailId > 0) this.userDetails();
  }

  fetchMenu() {
    this.navServices.headerMenu().subscribe((menus) => {
      this.dynamicMenus = menus;
    });
  }

  routeMenu(item:any, nestedMenu:any){
    this.router.navigateByUrl(nestedMenu?.codeUrl);
  }

  // Toggle the main menu visibility
  mainMenuToggle() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  toggleAcademics(): void {
    this.isAcademicsOpen = !this.isAcademicsOpen;
  }

  onLogout() {
    this.authService.logout(); // Perform logout
    this.isLoggedIn = false; // Update isLoggedIn status
    setTimeout(() => {
      window.location.reload(); // Reload the page to reflect changes
    }, 100);
  }

  // Toggle the dropdown visibility
  toggleDropdown(menu: string, event: Event): void {
    event.preventDefault(); // Prevent default link behavior

    // Toggle dropdown visibility for the clicked menu
    this.activeDropdown = this.activeDropdown === menu ? null : menu;
  }

  // HostListener to detect clicks outside the menu and close dropdowns
  @HostListener("document:click", ["$event"])
  clickOutside(event: Event): void {
    const target = event.target as HTMLElement;

    // Check if the click is outside the menu container or toggle button
    const menu = document.getElementById("mainnav"); // Get the menu element
    const toggleButton = document.querySelector(".toggle-nav"); // Get the toggle button

    // Close the main menu and dropdowns if clicked outside
    if (
      menu &&
      toggleButton &&
      !menu.contains(target) &&
      !toggleButton.contains(target)
    ) {
      this.isMenuVisible = false; // Close the main menu
      this.activeDropdown = null; // Close any open dropdown
    }

    // Close individual dropdowns if clicked outside
    const dropdowns = ["services", "business", "partner"]; // List of menu categories
    dropdowns.forEach((dropdown) => {
      const dropdownElement = document.getElementById(dropdown);
      if (dropdownElement && !dropdownElement.contains(target)) {
        if (this.activeDropdown === dropdown) {
          this.activeDropdown = null; // Close the dropdown if clicked outside
        }
      }
    });
  }

  userDetails() {
    this.accountService.getloggedinUserDetailsById(this.userDetailId ?? 0).subscribe((x: any) => {
      this.authService.user.next(x.firstName);
      this.authService.userImage.next(this.imageUrl + x.imagePath);
      this.authService.user.subscribe((x) => (this.username = x));
      this.authService.userImage.subscribe((x) => (this.userimage = x));
    });
  }

}
