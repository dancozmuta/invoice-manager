import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../models/invoice.interface';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss'],
})
export class InvoiceDetailsComponent implements OnInit {
  selectedInvoice: Invoice | null = null;

  constructor(private router: Router, private invoiceService: InvoiceService) {
    this.invoiceService.selectedInvoice$.subscribe((invoice) => {
      this.selectedInvoice = invoice;
    });
  }

  ngOnInit(): void {
    this.invoiceService.currentInvoiceId$.subscribe((invoiceId) => {
      console.log('Invoice ID:', invoiceId); // Log the invoiceId
      if (invoiceId) {
        this.invoiceService.getInvoiceDetails().subscribe(
          (details) => {
            this.selectedInvoice = details || null;
            console.log('Selected Invoice:', this.selectedInvoice);
            if (!this.selectedInvoice) {
              // Handle not found scenario, for example, redirect to list
              this.router.navigate(['/']);
            }
          },
          (error) => {
            console.error('Error fetching invoice details:', error);
          }
        );
      }
    });
  }
  

  onBackClick(): void {
    this.invoiceService.setSelectedInvoice(null);
    this.router.navigate(['/']);
  }
}
