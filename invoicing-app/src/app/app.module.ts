import { NgModule } from "@angular/core";
import { BrowserModule, provideClientHydration } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { InvoiceCreateComponent } from "./components/invoice-create/invoice-create.component";
import { InvoiceDetailsComponent } from './components/invoice-details/invoice-details.component';
import { InvoiceItemComponent } from './components/invoice-item/invoice-item.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { InvoiceListComponent } from "./components/invoice-list/invoice-list.component";
import { ButtonComponent } from "./components/button/button.component";

@NgModule({
    declarations: [
        AppComponent,
        InvoiceCreateComponent,
        InvoiceDetailsComponent,
        InvoiceListComponent,
        InvoiceItemComponent,
        InvoiceComponent,
        ButtonComponent
    ],
    providers: [
        provideClientHydration(),
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
    ]
})
export class AppModule { }
function provideHttpClient() {
    throw new Error("Function not implemented.");
}

