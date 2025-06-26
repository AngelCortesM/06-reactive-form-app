import {
  AbstractControl,
  FormArray,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';

async function sleep() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 2000);
  });
}

export class FormUtils {
  //Expresiones regulares
  static readonly namePattern = '^([a-zA-Z]+) ([a-zA-Z]+)';
  static readonly emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static readonly notOnlySpacesPattern = '^[a-zA-Z0-9]+$';
  static readonly passwordPattern = '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$';

  static getTextError(errors: ValidationErrors) {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es obligatorio';
        case 'minlength':
          return `La longitud mínima es ${errors['minlength'].requiredLength} caracteres.`;
        case 'min':
          return `El valor mínimo es ${errors['min'].min}`;
        case 'email':
          return `El formato del correo electrónico es inválido`;
        case 'emailTaken':
          return `El correo electrónico ya está en uso`;
        case 'pattern':
          if (errors['pattern'].requiredPattern === FormUtils.emailPattern) {
            return `El valor ingresado no es un correo electrónico válido`;
          }
          return `Error de patrón contra expresión regular`;
        case 'password':
          return `El formato de la contraseña es inválido`;
        case 'notStrider':
          return `El username no puede ser Strider`;
        default:
          return `Error no controlado ${key}`;
      }
    }
    return null;
  }

  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return (
      !!form.controls[fieldName].errors && form.controls[fieldName].touched
    );
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName].errors) return null;
    const errors = form.controls[fieldName].errors ?? {};

    return FormUtils.getTextError(errors);
  }

  static isValidFieldInArray(formArray: FormArray, index: number) {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  static getFieldErrorInArray(
    formArray: FormArray,
    index: number
  ): string | null {
    if (formArray.controls.length === 0) return null;
    const errors = formArray.controls[index].errors ?? {};
    return FormUtils.getTextError(errors);
  }

  static isFieldOneEqualFieldTwo(field1: string, field2: string) {
    return (formGroup: AbstractControl) => {
      const fieldOne = formGroup.get(field1)?.value;
      const fieldTwo = formGroup.get(field2)?.value;
      return fieldOne === fieldTwo ? null : { passwordsNotEqual: true };
    };
  }
  static async checkingServerResponse(
    control: AbstractControl
  ): Promise<ValidationErrors | null> {
    await sleep();
    const formValue = control.value;
    if (formValue === 'hola@mungo.com') {
      return { emailTaken: true };
    }
    return null;
  }
  static notStrider(control: AbstractControl): ValidationErrors | null {
    const formValue = control.value;
    return formValue === 'strider' ? { notStrider: true } : null;
  }
}
