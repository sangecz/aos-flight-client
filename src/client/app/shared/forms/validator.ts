/**
 * Created by sange on 03/11/2016.
 */

import {FormControl, ValidatorFn, AbstractControl} from '@angular/forms';

export function validateDateTime(): ValidatorFn {

  return (control: AbstractControl): {[key: string]: any} => {
    console.log('val:', control.value);

    let val = new Date(control.value).getTime();
    const no = !val;
    return no ? {'validateDateTime': {val}} : null;
  };

}