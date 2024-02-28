import { Component, Input } from '@angular/core';
import { Invoice } from '../../models/invoice.interface';
import { InvoiceService } from '../../services/invoice.service';


@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent {
  constructor(private invoiceService: InvoiceService) {}

  saveAsDraft(event: Event): void {
    event.preventDefault(); // Prevent the default form submission behavior
    const newInvoice: Invoice = {
      id: '',
      createdAt: '',
      paymentDue: '',
      description: '',
      paymentTerms: 0,
      clientName: '',
      clientEmail: '',
      status: 'draft', // Set the status to 'draft'
      senderAddress: undefined,
      clientAddress: undefined,
      items: [],
      total: 0,
    };

    // Call the service method to create the invoice
    this.invoiceService.createInvoice(newInvoice, true);

    // Close the off-canvas
    this.invoiceService.toggleOffCanvas(false);
  }
}