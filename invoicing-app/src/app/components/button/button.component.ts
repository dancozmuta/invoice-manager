import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() icon: string | undefined;
  @Input() text: string = '';
  @Input() buttonClass: string = ""; 
  @Output() buttonClicked: EventEmitter<void> = new EventEmitter<void>();

  onClick(): void {
    this.buttonClicked.emit();
  }
}
