import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideIcons, provideNgIconsConfig } from '@ng-icons/core';
import { hugeCompass, hugeVolumeHigh, hugeVolumeMute02 } from '@ng-icons/huge-icons';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideNgIconsConfig({
        size: '1em',
    }),
    provideIcons({ hugeVolumeHigh, hugeVolumeMute02, hugeCompass }),
    provideStore()
],
};
