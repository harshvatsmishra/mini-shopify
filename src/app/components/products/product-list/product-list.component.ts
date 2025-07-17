import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Product } from '../../../models/product.model';
import { Observable } from 'rxjs';
import { ProductService } from '../../../services/product.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent implements OnInit {
  products$!: Observable<Product[]>;

  priceSortOrder: 'asc' | 'desc' | null = null;
  ratingSortOrder: 'asc' | 'desc' | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products$ = this.productService.displayProducts$;
  }

  //Toggle sort

  toggleSort(key: 'price' | 'rating'): void {
    if (key === 'price') {
      this.ratingSortOrder = null;
      this.priceSortOrder = this.priceSortOrder === 'asc' ? 'desc' : 'asc';
      this.productService.setSort(key, this.priceSortOrder);
    } else {
      this.priceSortOrder = null;
      // Default to high-to-low (desc) on first click for rating
      this.ratingSortOrder = this.ratingSortOrder === 'desc' ? 'asc' : 'desc';
      this.productService.setSort(key, this.ratingSortOrder);
    }
  }

  // Clear Filters

  clearFilters(): void {
    this.priceSortOrder = null;
    this.ratingSortOrder = null;
    this.productService.clearSort();
  }

  //trackBy to optimize ngFor

  trackByProductId(index: number, product: Product): number {
    return product.id;
  }
}
