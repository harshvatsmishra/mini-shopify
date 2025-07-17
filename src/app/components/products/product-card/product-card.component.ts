import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../models/product.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() product: Product | null = null;
  // @Output() quickShopClicked = new EventEmitter<Product>();

  // onQuickShop() {
  //   this.quickShopClicked.emit(this.product!);
  // }
}
