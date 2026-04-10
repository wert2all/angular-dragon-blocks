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
  template: `
    <header class="px-6 mt-6 flex items-center gap-4">
      <a
        class="flex items-center gap-2 sm:gap-4 rounded-xl sm:rounded-2xl bg-warm-cream/95 px-3 py-2 sm:px-6 sm:py-3 shadow-lg shadow-deep-purple/10 backdrop-blur-sm transition-transform duration-300 hover:scale-105 cursor-pointer"
        href="/"
      >
        <img
          ngSrc="/dragon-blocks-logo.svg"
          alt="Dragon Blocks"
          width="180"
          height="48"
          priority
          class="h-24 sm:h-10 w-auto object-contain"
        />
        <div class="hidden h-6 sm:h-8 w-px bg-vibrant-orange/40 sm:block"></div>
        <span
          class="hidden text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-deep-purple sm:block font-fancy"
        >
          <b class="text-xl sm:text-2xl md:text-3xl">Dragon Blocks:</b>
          <span class="hidden md:inline">Reading Adventures</span>
          <span class="md:hidden">Reading</span>
        </span>
      </a>
      <a
        role="button"
        tabindex="0"
        (click)="toggleVolume()"
        (keydown.enter)="toggleVolume()"
        (keydown.space)="$event.preventDefault(); toggleVolume()"
        [attr.aria-label]="isVolumeOn() ? 'Turn off sound' : 'Turn on sound'"
        class="ml-auto rounded-xl bg-warm-cream/95 p-2 sm:p-3 shadow-lg shadow-deep-purple/10 backdrop-blur-sm transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-vibrant-orange cursor-pointer"
      >
        <ng-icon
          [name]="isVolumeOn() ? 'hugeVolumeHigh' : 'hugeVolumeMute02'"
          class="text-xl sm:text-2xl text-deep-purple"
          size="1.5em"
        />
      </a>
    </header>
  `,
})
export class Header {
  isVolumeOn = signal(true);

  toggleVolume(): void {
    this.isVolumeOn.update((on) => !on);
  }
}
