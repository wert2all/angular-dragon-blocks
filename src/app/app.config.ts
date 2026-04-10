import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideIcons } from "@ng-icons/core";
import {
  hugeCompass,
  hugeVolumeHigh,
  hugeVolumeMute02,
} from "@ng-icons/huge-icons";
import { routes } from "./app.routes";
import { provideState, provideStore } from "@ngrx/store";
import { appFeature } from "./store/app.feature";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideIcons({ hugeVolumeHigh, hugeVolumeMute02, hugeCompass }),
    provideStore(),
    provideState(appFeature),
  ],
};
