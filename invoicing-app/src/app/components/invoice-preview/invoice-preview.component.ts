import { Component, Input } from '@angular/core';
import { Invoice } from '../../models/invoice.interface';

@Component({
  selector: 'app-invoice-preview',
  templateUrl: './invoice-preview.component.html',
  styleUrl: './invoice-preview.component.scss'
})
export class InvoicePreviewComponent {
  @Input() invoice!: Invoice; 
}
