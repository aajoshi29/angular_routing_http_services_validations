import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/app.category.model';
import { Manufacturer } from 'src/app/models/app.manufacturer.model';
import { Product } from 'src/app/models/app.product.model';
import { CategoryService } from 'src/app/services/app.category.service';
import { CustomValidatorService } from 'src/app/services/app.custom-validator.service';
import { ManufacturerService } from 'src/app/services/app.manufacturer.service';
import { ProductService } from 'src/app/services/app.product.service';
import { CustomValidator } from 'src/app/utilities/app.custom-validator';

@Component({
  selector: 'app-edit-product-form',
  templateUrl: './app.edit-product-form.component.html',
})
export class EditProductFormComponent {
  frmProduct: FormGroup;
  product: Product;
  categories: Array<Category>;
  manufacturers: Array<Manufacturer>;

  constructor(
    private prodService: ProductService,
    private catService: CategoryService,
    private manuService: ManufacturerService,
    private customValidatorService: CustomValidatorService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.prodService.getProductByRowId(
      Number(this.activatedRoute.snapshot.paramMap.get('id'))
    );
    this.categories = this.catService.categories;
    this.manufacturers = this.manuService.manufacturers;
    this.product = new Product(0, '', '', '', '', '', 0);
    this.frmProduct = new FormGroup({
      ProductRowId: new FormControl(
        this.product.ProductRowId === 0 ? '' : this.product.ProductRowId,
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(8),
          Validators.pattern('[0-9]+'),
        ])
      ),
      ProductId: new FormControl(
        this.product.ProductId,
        Validators.compose([
          Validators.required,
          Validators.pattern('[A-Za-z0-9-_]+'),
          this.customValidatorService.checkUnique.bind(this),
        ])
      ),
      ProductName: new FormControl(
        this.product.ProductName,
        Validators.compose([
          Validators.required,
          Validators.pattern('[A-Za-z]+'),
          CustomValidator.checkUpperCase,
        ])
      ),
      Description: new FormControl(this.product.Description),
      CategoryName: new FormControl(this.product.CategoryName),
      BasePrice: new FormControl(
        this.product.BasePrice === 0 ? '' : this.product.BasePrice
      ),
      Manufacturer: new FormControl(this.product.Manufacturer),
    });
  }

  ngOnInit() {
    this.prodService.productNotify.subscribe((prod: Product) => {
      this.frmProduct.setValue({
        ProductRowId: prod.ProductRowId,
        ProductId: prod.ProductId,
        ProductName: prod.ProductName,
        Manufacturer: prod.Manufacturer,
        CategoryName: prod.CategoryName,
        BasePrice: prod.BasePrice,
        Description: prod.Description,
      });
    });
  }

  save(): void {
    this.product = this.frmProduct.value;
    this.frmProduct.reset({
      CategoryName: '',
      Manufacturer: '',
    });
    if (
      this.prodService
        .getProducts()
        .filter((p) => p.ProductRowId === this.product.ProductRowId).length ===
      0
    ) {
      this.prodService.addProduct(this.product);
    }
    this.prodService.updateProduct(this.product.ProductRowId, this.product);
    this.router.navigate(['']);
  }
}
