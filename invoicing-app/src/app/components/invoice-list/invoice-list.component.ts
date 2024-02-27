import { Component, OnInit } from '@angular/core';
import { Invoice } from '../../models/invoice.interface';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {
  invoices: Invoice[] = [];
  showOffCanvas: boolean = false;

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.invoiceService.getInvoices().subscribe((invoices) => {
      this.invoices = invoices;
    });

    // Subscribe to showOffCanvas$ observable
    this.invoiceService.showOffCanvas$.subscribe((show) => {
      this.showOffCanvas = show;
    });
  }

  toggleOffCanvas() {
    console.log('Toggle Off Canvas in Invoice List:', !this.showOffCanvas);
    this.invoiceService.toggleOffCanvas(!this.showOffCanvas);
  }
}
