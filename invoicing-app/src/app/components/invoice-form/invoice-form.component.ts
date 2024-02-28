import { Component, Input, OnInit } from '@angular/core';
import { Invoice } from '../../models/invoice.interface';
import { InvoiceService } from '../../services/invoice.service';


@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {
  selectedInvoice: Invoice | null = null;
  @Input() invoice!: Invoice;

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.invoiceService.selectedInvoice$.subscribe((selectedInvoice) => {
      this.selectedInvoice = selectedInvoice;
    });
  }

  saveAsDraft(event: Event): void {
    // Prevent the default form submission
    event.preventDefault(); 
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
      total: 0,
    };

    // Call the service method to create the invoice
    this.invoiceService.createInvoice(newInvoice, true);

    // Close the off-canvas
    this.invoiceService.toggleOffCanvas(false);
  }

  onInvoiceClick(): void {
    this.invoiceService.setSelectedInvoice(this.invoice);
  }
}