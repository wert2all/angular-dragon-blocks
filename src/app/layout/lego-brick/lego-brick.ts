import { Component, input } from '@angular/core';

export type BrickColor = 'lego-deep-purple' | 'lego-soft-teal' | 'lego-vibrant-orange';

@Component({
  selector: 'app-lego-brick',
  templateUrl: './lego-brick.html',
  styleUrl: './lego-brick.css',
})
export class LegoBrick {
  value = input.required<string>();

  /**
   * CSS class for the brick color (from app palette).
   * Options: 'lego-deep-purple' (default), 'lego-soft-teal', 'lego-vibrant-orange'
   */
  colorClass = input<BrickColor>('lego-deep-purple');

  /**
   * Optional size variant.
   * Options: 'normal' (default), 'small', 'large'
   */
  size = input<'small' | 'normal' | 'large'>('normal');

  /**
   * Returns the full class string combining base classes with color class
   */
  get classes(): string {
    return `lego-brick group ${this.colorClass()}`;
  }
}
