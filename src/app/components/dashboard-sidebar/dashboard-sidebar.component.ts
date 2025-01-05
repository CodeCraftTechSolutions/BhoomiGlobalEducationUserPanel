import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-sidebar',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './dashboard-sidebar.component.html',
  styleUrl: './dashboard-sidebar.component.css'
})
export class DashboardSidebarComponent {

  openInfo = false;

  toggleSidebar() {
    this.openInfo = !this.openInfo;
  }

  closeSidebar() {
    this.openInfo = false;
  }

  @HostListener("document:click", ["$event"])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const sidebar = document.querySelector(".dashboard-left") as HTMLElement;
    const button = document.querySelector(".toggle-sidebar") as HTMLElement;

    if (
      this.openInfo &&
      !sidebar.contains(target) &&
      !button.contains(target)
    ) {
      this.openInfo = false;
    }
  }
}
