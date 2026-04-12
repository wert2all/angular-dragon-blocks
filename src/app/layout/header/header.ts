import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { VolumeToggler } from '../../features/voice/share/volume-toggler/volume-toggler';
import { AppActions } from '../../store/app.actions';
import { Store } from '@ngrx/store';
import { appFeature } from '../../store/app.feature';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage, VolumeToggler, RouterLink, NgIcon],
  host: {
    class: 'contents',
  },
  templateUrl: './header.html',
})
export class Header {
  private store = inject(Store);

  protected isVolumeOn = this.store.selectSignal(appFeature.isVolumeOn);

  toggleVolume(): void {
    this.store.dispatch(AppActions.toggleSound());
  }
}
