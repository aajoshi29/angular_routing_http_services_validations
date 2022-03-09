import { Injectable } from '@angular/core';
import { Manufacturer } from '../models/app.manufacturer.model';

@Injectable({ providedIn: 'root' })
export class ManufacturerService {
  manufacturers: Array<Manufacturer>;

  constructor() {
    this.manufacturers = new Array<Manufacturer>();
    this.manufacturers.push(new Manufacturer(1, 'Bajaj'));
    this.manufacturers.push(new Manufacturer(2, 'Dell'));
    this.manufacturers.push(new Manufacturer(3, 'Kissan'));
    this.manufacturers.push(new Manufacturer(4, 'Maggi'));
    this.manufacturers.push(new Manufacturer(5, 'Apple'));
  }
}
