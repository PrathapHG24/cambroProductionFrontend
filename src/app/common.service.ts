import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }
}
export const FormValidationMessages = {
  required: 'This field is required',
  pattern: 'Invalid input'
}