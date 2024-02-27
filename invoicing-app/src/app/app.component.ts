import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { InvoiceService } from './services/invoice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit{
  title = 'invoicing-app';

  showOffCanvas$: Observable<boolean> | undefined;

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.showOffCanvas$ = this.invoiceService.showOffCanvas$;
  }

  toggleOffCanvas(show: boolean): void {
    console.log('showOffCanvas$', this.showOffCanvas$);
    this.showOffCanvas$ = of(show);
  }
}
