import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductFormComponent } from './components/ProductForm/app.product-form.component';
import { EditProductFormComponent } from './components/ProductForm/EditProductForm/app.edit-product-form.component';
import { ProductListComponent } from './components/ProductList/app.product-list.component';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
  },
  {
    path: 'create',
    component: ProductFormComponent,
  },
  {
    path: 'update/:id',
    component: EditProductFormComponent,
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
