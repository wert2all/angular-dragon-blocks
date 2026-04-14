import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { hugeCompass, hugeMapsLocation01, hugeVolumeHigh, hugeVolumeMute02 } from '@ng-icons/huge-icons';
import { routes } from './app.routes';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { appFeature } from './store/app.feature';
import { questFeature } from './features/quest/store/quest.feature';
import { questEffects } from './features/quest/store/quest.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideIcons({ hugeVolumeHigh, hugeVolumeMute02, hugeCompass, hugeMapsLocation01 }),
    provideStore(),
    provideState(appFeature),
    provideState(questFeature),
    provideEffects(questEffects),
  ],
};
