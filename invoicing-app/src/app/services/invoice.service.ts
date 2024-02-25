import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Invoice } from '../models/invoice.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private URL = 'assets/data.json';

  private invoicesSubject: BehaviorSubject<Invoice[]> = new BehaviorSubject<Invoice[]>([]);
  invoices$: Observable<Invoice[]> = this.invoicesSubject.asObservable();

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
      }
    });       
  }

  getInvoices(): Observable<Invoice[]> {
    return this.invoices$;
  }

  createInvoice(newInvoice: Invoice): void {
    
    const currentInvoices = this.invoicesSubject.value;
    const updatedInvoices = [...currentInvoices, newInvoice];
    this.invoicesSubject.next(updatedInvoices);
  }

  updateInvoice(updatedInvoice: Invoice): void {
   
    const currentInvoices = this.invoicesSubject.value;
    const updatedInvoices = currentInvoices.map((invoice) =>
      invoice.id === updatedInvoice.id ? updatedInvoice : invoice
    );
    this.invoicesSubject.next(updatedInvoices);
  }

  deleteInvoice(invoiceId: string): void {
   
    const currentInvoices = this.invoicesSubject.value;
    const updatedInvoices = currentInvoices.filter((invoice) => invoice.id !== invoiceId);
    this.invoicesSubject.next(updatedInvoices);
  }
}
