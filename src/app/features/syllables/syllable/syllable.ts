import { Component, input } from "@angular/core";

@Component({
  selector: 'app-syllable',
  templateUrl: './syllable.html',
  styleUrl: './syllable.css'
})
export class Syllable {
  value = input.required<string>();
  
  /**
   * CSS class for the brick color (from app palette).
   * Options: 'lego-deep-purple' (default), 'lego-soft-teal', 'lego-vibrant-orange'
   */
  colorClass = input<string>('lego-deep-purple');
  
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