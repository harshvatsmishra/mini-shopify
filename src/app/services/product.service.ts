import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, combineLatest, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Product } from '../models/product.model';

type SortOptions = {
  key: 'price' | 'rating' | null;
  order: 'asc' | 'desc' | null;
};

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://fakestoreapi.com/products';
  private allProducts$!: Observable<Product[]>;

  // State Management Subjects
  private selectedCategorySubject = new BehaviorSubject<string>('All');
  private searchSubject = new BehaviorSubject<string>('');
  private sortSubject = new BehaviorSubject<SortOptions>({
    key: null,
    order: null,
  });

  displayProducts$: Observable<Product[]>;

  constructor(private http: HttpClient) {
    this.allProducts$ = this.http.get<Product[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Failed to fetch products:', error);
        return of([]);
      })
    );

    this.displayProducts$ = combineLatest([
      this.allProducts$,
      this.selectedCategorySubject,
      this.searchSubject,
      this.sortSubject,
    ]).pipe(
      map(([products, category, searchTerm, sortOptions]) => {
        let filteredProducts = [...products];

        // Filtering
        if (category !== 'All') {
          filteredProducts = filteredProducts.filter(
            (p) => p.category === category
          );
        }

        // Searching
        if (searchTerm) {
          filteredProducts = filteredProducts.filter((p) =>
            p.title.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        // Sorting
        if (sortOptions.key && sortOptions.order) {
          filteredProducts.sort((a, b) => {
            const valA = sortOptions.key === 'price' ? a.price : a.rating.rate;
            const valB = sortOptions.key === 'price' ? b.price : b.rating.rate;

            if (valA < valB) {
              return sortOptions.order === 'asc' ? -1 : 1;
            }
            if (valA > valB) {
              return sortOptions.order === 'asc' ? 1 : -1;
            }
            return 0;
          });
        }

        return filteredProducts;
      })
    );
  }

  setSelectedCategory(category: string): void {
    this.selectedCategorySubject.next(category);
  }

  setSearchTerm(term: string): void {
    this.searchSubject.next(term);
  }

  setSort(key: 'price' | 'rating' | null, order: 'asc' | 'desc' | null): void {
    this.sortSubject.next({ key, order });
  }

  clearSort(): void {
    this.sortSubject.next({ key: null, order: null });
  }

  // Fetching categories

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/categories`).pipe(
      catchError((error) => {
        console.error('Failed to fetch categories:', error);
        return of([]);
      })
    );
  }

  //Fetching product by id for details page
  getProductById(id: number): Observable<Product | null> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error(`Failed to fetch product with id=${id}:`, error);
        return of(null);
      })
    );
  }
}
