import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, switchMap } from 'rxjs';
import { Invoice } from '../models/invoice.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private URL = 'assets/data.json';

  private invoicesSubject: BehaviorSubject<Invoice[]> = new BehaviorSubject<Invoice[]>([]);
  invoices$: Observable<Invoice[]> = this.invoicesSubject.asObservable();

  private selectedInvoiceSubject: BehaviorSubject<Invoice | null> = new BehaviorSubject<Invoice | null>(null);
  selectedInvoice$: Observable<Invoice | null> = this.selectedInvoiceSubject.asObservable();

  private currentInvoiceIdSubject: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>(null);
  currentInvoiceId$: Observable<string | null> =
    this.currentInvoiceIdSubject.asObservable();

    setCurrentInvoiceId(invoiceId: string | null): void {
      this.currentInvoiceIdSubject.next(invoiceId);
    }

  constructor(private http: HttpClient) {
    this.loadInvoices();
  }

  private loadInvoices(): void {
    // Fetch invoices from data.json
    this.http.get<Invoice[]>(this.URL).subscribe({
      next: (invoices) => {
        this.invoicesSubject.next(invoices);
      },
      error: (error) => {
        console.error('Error loading invoices', error);
      },
    });
  }

  getInvoices(): Observable<Invoice[]> {
    return this.invoices$;
  }

  getInvoiceDetails(invoiceId: string): Observable<Invoice | undefined> {
    console.log('Inside getInvoiceDetails:', invoiceId);
    return invoiceId
      ? this.invoices$.pipe(
          map((invoices) => invoices.find((invoice) => invoice.id === invoiceId))
        )
      : of(undefined);
  }
  

  private generateRandomId(): string {
    const randomLetters = this.generateRandomLetters(2);
    const randomNumbers = this.generateRandomNumbers(4);

    return `${randomLetters}${randomNumbers}`;
  }

  private generateRandomLetters(length: number): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      result += letters.charAt(randomIndex);
    }
    return result;
  }

  private generateRandomNumbers(length: number): string {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += Math.floor(Math.random() * 10).toString();
    }
    return result;
  }

  updateInvoiceStatus(invoiceId: string, newStatus: 'draft' | 'pending' | 'paid'): void {
    const currentInvoices = this.invoicesSubject.value;
    const updatedInvoices = currentInvoices.map((invoice) =>
      invoice.id === invoiceId ? { ...invoice, status: newStatus } : invoice
    );
    this.invoicesSubject.next(updatedInvoices);
  }

  createInvoice(newInvoice: Invoice, saveAsDraft: boolean = false): Invoice {
    if (saveAsDraft) {
      // Set ID and status for drafts
      newInvoice.id = this.generateRandomId();
    newInvoice.status = 'draft';
    } else {
      // Set ID, status, and other properties for pending invoices
      newInvoice.id = this.generateRandomId();
      newInvoice.status = 'pending';
    }

    // Update the list of invoices
  const currentInvoices = this.invoicesSubject.value;
  const updatedInvoices = [...currentInvoices, newInvoice];
  this.invoicesSubject.next(updatedInvoices);

  // Select the newly created invoice
  this.setSelectedInvoice(newInvoice);

  return newInvoice;
  }

  updateInvoice(updatedInvoice: Invoice): void {
    const currentInvoices = this.invoicesSubject.value;
    const updatedInvoices = currentInvoices.map((invoice) =>
      invoice.id === updatedInvoice.id ? updatedInvoice : invoice
    );
    this.invoicesSubject.next(updatedInvoices);

    // Select the updated invoice
    this.setSelectedInvoice(updatedInvoice);
  }

  deleteInvoice(invoiceId: string): void {
    const currentInvoices = this.invoicesSubject.value;
    const updatedInvoices = currentInvoices.filter(
      (invoice) => invoice.id !== invoiceId
    );
    this.invoicesSubject.next(updatedInvoices);

    // Deselect the deleted invoice
    this.setSelectedInvoice(null);
  }

  private showOffCanvasSubject = new BehaviorSubject<boolean>(false);
  showOffCanvas$ = this.showOffCanvasSubject.asObservable();

  toggleOffCanvas(show: boolean): void {
    console.log('toggle off canvas in service. Current value:', show);
    this.showOffCanvasSubject.next(show);
  }

  setSelectedInvoice(invoice: Invoice | null): void {
    this.selectedInvoiceSubject.next(invoice);
  }
}
