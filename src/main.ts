/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from '../src/app/app-routing.module';
import { provideHttpClient } from '@angular/common/http';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  bootstrapApplication(AppComponent,{ providers:[provideRouter(routes),[provideHttpClient()]]}).catch(err => console.error(err));
  