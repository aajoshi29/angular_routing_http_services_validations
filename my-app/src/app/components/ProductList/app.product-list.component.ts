import { Component } from '@angular/core';
import { Product } from 'src/app/models/app.product.model';
import { ProductService } from 'src/app/services/app.product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './app.product-list.component.html',
})
export class ProductListComponent {
  columnHeaders = [
    'ProductRowId',
    'ProductId',
    'ProductName',
    'Description',
    'BasePrice',
    'CategoryName',
    'Manufacturer',
  ];
  products: Array<Product>;

  constructor(private prodService: ProductService) {
    this.products = this.prodService.getProducts();
  }

  ngOnInit() {
    this.prodService.notify.subscribe((prods: Array<Product>) => {
      this.products = prods;
    });
  }

  onUpdate(prod: Product) {
    this.prodService.onSelectProduct(prod);
  }

  onDelete(id: number) {
    this.prodService.deleteProduct(id);
  }
}
