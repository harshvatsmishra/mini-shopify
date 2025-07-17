import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  categories$!: Observable<string[]>;
  activeCategory: string = 'All';

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.categories$ = this.productService.getCategories();
  }

  selectCategory(event: MouseEvent, category: string): void {
    event.preventDefault();
    this.router.navigate(['/products']);
    this.activeCategory = category;
    this.productService.setSelectedCategory(category);
  }

  onSearch(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.productService.setSearchTerm(searchTerm);
  }

  navigateToHome() {
    this.router.navigate(['/products']);
  }
}
