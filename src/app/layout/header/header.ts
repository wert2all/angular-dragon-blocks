import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage, NgIcon],
  host: {
    class: 'contents',
  },
  templateUrl: './header.html',
})
export class Header {
  isVolumeOn = signal(true);
  toggleVolume(): void {
    this.isVolumeOn.update((on) => !on);
  }
}
