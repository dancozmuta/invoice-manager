import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceDetailsComponent } from './components/invoice-details/invoice-details.component';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';

const routes: Routes = [
  // Set the default route to the invoice list
  { path: '', component: InvoiceListComponent },
  { path: 'invoice/:id', component: InvoiceDetailsComponent },

  // Redirect to the invoice list for unknown routes
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
