/**
 * Created by sange on 03/11/2016.
 */

import {ValidatorFn, AbstractControl} from '@angular/forms';

export function validateDateTime(couldEmpty: boolean): ValidatorFn {

  return (control: AbstractControl): {[key: string]: any} => {

    if(couldEmpty && control.value === '') {
      return null;
    }

    let val = new Date(control.value).getTime();
    const no = !val;
    return no ? {'validateDateTime': {val}} : null;
  };

}