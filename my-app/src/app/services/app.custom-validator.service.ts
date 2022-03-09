import { Injectable, EventEmitter } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ProductService } from './app.product.service';

@Injectable({ providedIn: 'root' })
export class CustomValidatorService {
  constructor(private prodService: ProductService) {}

  checkUnique(ctrl: AbstractControl): any {
    if (
      this.prodService
        .getProducts()
        .filter((prod) => prod.ProductId === ctrl.value).length > 0
    ) {
      return { unique: false };
    }
    return null;
  }
}
