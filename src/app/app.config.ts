import { provideHttpClient, withFetch, withInterceptors, withJsonpSupport } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { provideNativeDateAdapter } from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    provideNativeDateAdapter(),
    provideHttpClient(
      withFetch(),
      withJsonpSupport(),
      withInterceptors([errorInterceptor])
    )
  ]
};