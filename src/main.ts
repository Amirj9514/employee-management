import { bootstrapApplication } from '@angular/platform-browser';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { providePrimeNG } from 'primeng/config';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import Aura from '@primeuix/themes/aura';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular({ mode: 'ios'}),
    provideHttpClient(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    
    provideAnimationsAsync(),
    
    providePrimeNG({
      theme: {
         preset: Aura,
         options: {
          darkModeSelector: false || 'none',
          prefix: 'p',
        },
      },
    }),
  ],
});
