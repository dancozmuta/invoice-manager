import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OffCanvasComponent } from './components/off-canvas/off-canvas.component';
import { InvoiceDetailsComponent } from './components/invoice-details/invoice-details.component';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';
import { InvoicePreviewComponent } from './components/invoice-preview/invoice-preview.component';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { ButtonComponent } from './components/button/button.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    OffCanvasComponent,
    InvoiceDetailsComponent,
    InvoiceListComponent,
    InvoiceFormComponent,
    InvoicePreviewComponent,
    ButtonComponent,
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
})
export class AppModule {}
function provideHttpClient() {
  throw new Error('Function not implemented.');
}
