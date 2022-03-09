import { Injectable, EventEmitter } from '@angular/core';
import { Product } from '../models/app.product.model';
import { ProductHTTPService } from './app.http.service';

@Injectable({ providedIn: 'root' })
export class ProductService {
  product: Product;
  products: Array<Product>;
  filteredProducts: Array<Product>;
  notify: EventEmitter<Array<Product>>;
  productNotify: EventEmitter<Product>;

  constructor(private prodHttpService: ProductHTTPService) {
    this.products = new Array<Product>();
    this.notify = new EventEmitter<Array<Product>>();
    this.productNotify = new EventEmitter<Product>();
    this.prodHttpService.getProducts().subscribe({
      next: (response: Array<Product>) => {
        this.products = response;
        this.filteredProducts = new Array<Product>();
        this.notify.emit(this.products);
      },
      error: (error: any) => {},
    });
  }

  addProduct(prod: Product): void {
    this.prodHttpService.addProduct(prod).subscribe({
      next: (response: any) => {
        this.products = response;
        this.notify.emit(this.products);
      },
      error: (err: any) => {},
    });
  }

  getProducts(): Array<Product> {
    return this.products;
  }

  onSelectProduct(prod: Product) {
    this.product = prod;
    this.productNotify.emit(this.product);
  }

  updateProduct(prodRowId: number, prd: Product) {
    this.prodHttpService.updateProduct(prodRowId, prd).subscribe({
      next: (response: any) => {
        this.products = response;
        this.notify.emit(this.products);
      },
      error: (err: any) => {},
    });
  }

  searchProduct(filterText: string, filterType: string) {
    this.prodHttpService
      .searchProduct({ filterType: filterType, filterText: filterText })
      .subscribe({
        next: (response: Array<Product>) => {
          this.filteredProducts = response;
          this.notify.emit(this.filteredProducts);
        },
        error: (error: any) => {},
      });
  }

  deleteProduct(id: number) {
    this.prodHttpService.deleteProduct(id).subscribe({
      next: (response: any) => {
        this.products = response;
        this.notify.emit(this.products);
      },
      error: (error: any) => {},
    });
  }

  getProductByRowId(rowId: number) {
    this.prodHttpService.getProductByRowId(rowId).subscribe({
      next: (response: any) => {
        this.product = response;
        this.productNotify.emit(this.product);
      },
      error: (error: any) => {},
    });
  }
}
