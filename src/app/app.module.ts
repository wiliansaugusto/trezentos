import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { CsvService } from './core/service/csv-service.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, DatePipe, DecimalPipe, registerLocaleData } from '@angular/common';
import { RegistrarComponent } from './registrar/registrar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalRegistarComponent } from './modal/modal-registar/modal-registar.component';
import localePtBr from '@angular/common/locales/pt';
import { CeifadoresComponent } from './ceifadores/ceifadores.component';
import { CeifadoresLoginComponent } from './modal/ceifadores-login/ceifadores-login.component';

registerLocaleData(localePtBr);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    NavComponent,
    RegistrarComponent,
    ModalRegistarComponent,
    CeifadoresComponent,
    CeifadoresLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule,
    MatSort,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule




  ],
  providers: [CsvService,
     DecimalPipe,
     provideAnimationsAsync(),
     DatePipe,
    { provide: LOCALE_ID, useValue: 'pt-BR' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
