import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { UserserviceService } from '../../service/userservice.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  constructor(
    private userService: UserserviceService,
    private messageService: MessageService,
    private router: Router
  ) {}

  onLogout() {
    this.userService.logout().subscribe({
      next: () => {
        localStorage.removeItem('token');
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.message || 'Unknown error occurred',
          life: 5000,
        });
      },
    });
  }

  isMobileMenuOpen = false;
  isSearchActive = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleSearch() {
    this.isSearchActive = !this.isSearchActive;
  }
  
  navigateTo(route: string) {
    this.router.navigateByUrl(route);
    this.isMobileMenuOpen = false;
  }


}