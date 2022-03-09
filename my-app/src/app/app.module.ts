import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductFormComponent } from './components/ProductForm/app.product-form.component';
import { ProductListComponent } from './components/ProductList/app.product-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './components/Search/app.search.component';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './components/Main/app.main.component';
import { EditProductFormComponent } from './components/ProductForm/EditProductForm/app.edit-product-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductFormComponent,
    ProductListComponent,
    SearchComponent,
    MainComponent,
    EditProductFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
