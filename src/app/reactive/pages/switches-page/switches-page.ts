import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-switches-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './switches-page.html',
  styleUrl: './switches-page.css',
})
export class SwitchesPage {
  formUtils = FormUtils;
  private readonly fb = inject(FormBuilder);
  myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    wantNotifications: [true],
    termAndConditions: [false, Validators.requiredTrue],
  });

  submit() {
    this.myForm.markAllAsTouched();
    console.log(this.myForm.value);
  }
}
