import { Component, OnInit } from '@angular/core';
import { Invoice } from '../../models/invoice.interface';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrl: './invoice-list.component.scss'
})
export class InvoiceListComponent implements OnInit {
  invoices: Invoice[] = [];

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.invoiceService.getInvoices().subscribe((invoices) => {
      this.invoices = invoices;
    });
  }
}
