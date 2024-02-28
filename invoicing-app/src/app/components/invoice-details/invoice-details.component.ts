import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../models/invoice.interface';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss'],
})
export class InvoiceDetailsComponent implements OnInit {
  selectedInvoice: Invoice | null = null;
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private router: Router, private invoiceService: InvoiceService) {
    this.invoiceService.selectedInvoice$.subscribe((invoice) => {
      this.selectedInvoice = invoice;
    });
  }

  ngOnInit(): void {
    this.invoiceService.selectedInvoice$.subscribe((invoice) => {
      this.selectedInvoice = invoice;
    });

    this.invoiceService.currentInvoiceId$.subscribe((invoiceId) => {
      console.log('Invoice ID:', invoiceId);
      if (invoiceId) {
        this.invoiceService.getInvoiceDetails(invoiceId).subscribe(
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

  onEditClick(): void {
    
    console.log('Edit button clicked');
  }

  onDeleteClick(): void {
    
    if (this.selectedInvoice) {
      // Delete the current invoice
      this.invoiceService.deleteInvoice(this.selectedInvoice.id);

      // Navigate to the invoice list
      this.router.navigate(['/invoices']);
    }
  }

  onMarkAsPaidClick(): void {
    
    console.log('Mark as paid button clicked');
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
