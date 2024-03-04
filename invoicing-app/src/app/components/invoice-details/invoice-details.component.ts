import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../models/invoice.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss'],
})
export class InvoiceDetailsComponent implements OnInit, OnDestroy {
  selectedInvoice: Invoice | null = null;
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private router: Router, private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.invoiceService.selectedInvoice$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((invoice) => {
        this.selectedInvoice = invoice;
      });

    this.invoiceService.currentInvoiceId$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((invoiceId) => {
        console.log('Invoice ID:', invoiceId);
        if (invoiceId) {
          this.invoiceService.getInvoiceDetails(invoiceId)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
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
    if (this.selectedInvoice) {
      // Toggle off-canvas and pass the selected invoice
      this.invoiceService.toggleOffCanvas(true);
      this.invoiceService.setSelectedInvoiceForEdit(this.selectedInvoice);
    }
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
    if (this.selectedInvoice) {
      // Update the status to "paid"
      this.invoiceService.updateInvoiceStatus(this.selectedInvoice.id, 'paid');

      // Navigate to the invoice list
      this.router.navigate(['/invoices']);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
