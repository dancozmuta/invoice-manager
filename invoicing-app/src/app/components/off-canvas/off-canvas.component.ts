import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Invoice } from '../../models/invoice.interface';
import { InvoiceService } from '../../services/invoice.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-off-canvas',
  templateUrl: './off-canvas.component.html',
  styleUrls: ['./off-canvas.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class OffCanvasComponent {
  showOffCanvas$: Observable<boolean>;

  @Input() showOffCanvas: boolean = false;
  @Output() showOffCanvasChange = new EventEmitter<boolean>();

  constructor(private invoiceService: InvoiceService) {
    this.showOffCanvas$ = this.invoiceService.showOffCanvas$;
  }

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

  toggleOffCanvas(): void {
    console.log('Toggle Off Canvas:', !this.showOffCanvas);
    this.showOffCanvasChange.emit(!this.showOffCanvas);
    console.log('showOffCanvas$ value:', this.showOffCanvas$);

    const offCanvasElement = document.querySelector('.off-canvas');
    const overlayElement = document.querySelector('.overlay');

    offCanvasElement?.classList.remove('show');
    overlayElement?.classList.remove('active');
  }
}
