import { Injectable, EventEmitter } from '@angular/core';
import { Category } from '../models/app.category.model';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  categories: Array<Category>;

  constructor() {
    this.categories = new Array<Category>();
    this.categories.push(new Category(1, 'Electrical'));
    this.categories.push(new Category(2, 'Electronics'));
    this.categories.push(new Category(3, 'Food'));
  }
}
