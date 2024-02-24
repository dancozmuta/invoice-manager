import { Component, Input } from '@angular/core';
import { Invoice } from '../../models/invoice.interface';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.scss'
})
export class InvoiceComponent {
  @Input() invoice!: Invoice; 
}
