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

  createInvoice(newInvoice: Invoice, saveAsDraft: boolean = false): void {
    if (saveAsDraft) {
      // Set ID and status for drafts
      newInvoice.id = this.generateRandomId();
      newInvoice.status = 'draft';
    } else {
      // Set ID, status, and other properties for pending invoices
      newInvoice.id = this.generateRandomId();
      newInvoice.status = 'pending';
      // Additional logic for paymentDue, total, etc.
    }

    // Update the list of invoices
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
