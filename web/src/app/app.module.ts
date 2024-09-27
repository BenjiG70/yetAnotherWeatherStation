import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { SensorDataContainerComponent } from './components/sensor-data-container/sensor-data-container.component';
import { DetailInformationComponent } from './components/detail-information/detail-information.component';
import { HttpClientModule } from '@angular/common/http';
import { SensorDetailsDialogComponent } from './components/sensor-details-dialog/sensor-details-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NgApexchartsModule } from 'ng-apexcharts';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SensorDataContainerComponent,
    DetailInformationComponent,
    SensorDetailsDialogComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,  
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    NgApexchartsModule,
    RouterModule
  ],
  providers: [
  
    provideAnimationsAsync('noop')
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
