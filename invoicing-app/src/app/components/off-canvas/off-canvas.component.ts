import { Component } from '@angular/core';
import { Invoice } from '../../models/invoice.interface';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-off-canvas',
  templateUrl: './off-canvas.component.html',
  styleUrl: './off-canvas.component.scss'
})
export class OffCanvasComponent {
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
