import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/app.product.service';

@Component({
  selector: 'app-search',
  templateUrl: './app.search.component.html',
})
export class SearchComponent {
  frmSearch: FormGroup;
  filterType: string;
  filterText: string;

  constructor(private prodService: ProductService) {
    this.frmSearch = new FormGroup({
      filterType: new FormControl(),
      filterText: new FormControl(),
    });
  }

  ngOnInit() {}

  search(): void {
    this.prodService.searchProduct(
      this.frmSearch.value.filterText,
      this.frmSearch.value.filterType
    );
  }
}
