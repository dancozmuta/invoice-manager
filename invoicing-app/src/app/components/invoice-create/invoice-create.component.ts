import { Component } from '@angular/core';
import { Invoice } from '../../models/invoice.interface';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-invoice-create',
  templateUrl: './invoice-create.component.html',
  styleUrl: './invoice-create.component.scss'
})
export class InvoiceCreateComponent {
  constructor(private invoiceService: InvoiceService) {}

  onSaveAsDraft(): void {
    const newInvoice: Invoice = {
      id: '',
      createdAt: '',
      paymentDue: '',
      description: '',
      paymentTerms: 0,
      clientName: '',
      clientEmail: '',
      status: 'draft',
      senderAddress: undefined,
      clientAddress: undefined,
      items: [],
      total: 0
    };

    this.invoiceService.createInvoice(newInvoice, true);
  }

  onSaveAndSend(): void {
    const newInvoice: Invoice = {
      id: '',
      createdAt: '',
      paymentDue: '',
      description: '',
      paymentTerms: 0,
      clientName: '',
      clientEmail: '',
      status: 'draft',
      senderAddress: undefined,
      clientAddress: undefined,
      items: [],
      total: 0
    };

    this.invoiceService.createInvoice(newInvoice);
  }
}
