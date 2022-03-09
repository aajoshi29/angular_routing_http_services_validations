import { AbstractControl } from '@angular/forms';

export class CustomValidator {
  constructor() {}

  static checkUpperCase(ctrl: AbstractControl): any {
    if (
      ctrl.value?.length > 0 &&
      ctrl.value[0] == ctrl?.value[0]?.toUpperCase() &&
      ctrl.value[0] != ctrl?.value[0]?.toLowerCase()
    ) {
      return null;
    }
    return { case: false };
  }
}
