import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/app.product.model';

@Injectable({ providedIn: 'root' })
export class ProductHTTPService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8000/products/';
  }

  getProducts(): Observable<Array<Product>> {
    let response: Observable<Array<Product>>;
    response = this.http.get<Array<Product>>(this.url);
    return response;
  }

  searchProduct(criteria: any): Observable<Array<Product>> {
    let response: Observable<Array<Product>>;
    response = this.http.get<Array<Product>>(this.url, {
      params: {
        filterType: criteria.filterType,
        filterText: criteria.filterText,
      },
    });
    return response;
  }

  addProduct(prod: Product): any {
    let response: any;
    response = this.http.post<any>(this.url, prod, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  }

  updateProduct(prodRowId: number, prd: Product): any {
    let response: any;
    response = this.http.put<any>(`${this.url}${prodRowId}`, prd, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  }

  deleteProduct(id: number): any {
    let response: any;
    response = this.http.delete<any>(`${this.url}${id}`);
    return response;
  }

  getProductByRowId(rowId: number): Observable<Product> {
    let response: Observable<Product>;
    response = this.http.get<Product>(`${this.url}${rowId}`);
    return response;
  }
}
