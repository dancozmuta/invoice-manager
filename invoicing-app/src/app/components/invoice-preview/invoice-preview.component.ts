import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Invoice } from '../../models/invoice.interface';

@Component({
  selector: 'app-invoice-preview',
  templateUrl: './invoice-preview.component.html',
  styleUrl: './invoice-preview.component.scss'
})
export class InvoicePreviewComponent {
  @Input() invoice!: Invoice; 

  // Emitting the invoice ID
  @Output() openInvoice = new EventEmitter<string>(); 
  
  onInvoiceClick(): void {
    this.openInvoice.emit(this.invoice.id);
  }
}
