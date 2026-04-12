import { Component, input, output } from '@angular/core';

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
   * Whether the brick should shake (for incorrect/fake syllables)
   */
  shake = input<boolean>(false);

  click = output<string>();

  /**
   * Returns the full class string combining base classes with color class
   */
  get classes(): string {
    const shakeClass = this.shake() ? ' shake' : '';
    return `lego-brick group ${this.colorClass()}${shakeClass}`;
  }

  onClick(): void {
    this.click.emit(this.value());
  }
}
