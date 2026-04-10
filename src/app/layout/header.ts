import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
  template: `
    <header class="fixed left-0 right-0 top-10 z-50 flex h-20 items-center justify-center px-6">
      <a
        class="flex items-center gap-4 rounded-2xl bg-warm-cream/95 px-6 py-3 shadow-lg shadow-deep-purple/10 backdrop-blur-sm transition-transform duration-300 hover:scale-105 cursor-pointer"
        href="/"
      >
        <img
          ngSrc="/dragon-blocks-logo.svg"
          alt="Dragon Blocks"
          width="180"
          height="48"
          priority
          class="h-12 w-auto object-contain"
        />
        <div class="hidden h-8 w-px bg-vibrant-orange/40 sm:block"></div>
        <span class="hidden text-2xl font-bold tracking-tight text-deep-purple sm:block font-fancy"
          ><b class="text-3xl">Dragon Blocks:</b> Reading Adventures</span
        >
      </a>
    </header>
  `,
})
export class Header {}
