import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss',
})
export class InputFieldComponent {
  @Input()
  labelText!: string;
  @Input()
  inputId!: string;
  @Input()
  inputContainerClass!: string; 
  @Input() inputType: 'text' | 'email' | 'number' = 'text'; 
}
