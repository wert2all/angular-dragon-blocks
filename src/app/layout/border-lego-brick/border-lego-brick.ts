import { Component, input, computed } from '@angular/core';

export type BorderBrickColor = 'border-deep-purple' | 'border-soft-teal' | 'border-vibrant-orange';

@Component({
  selector: 'app-border-lego-brick',
  templateUrl: './border-lego-brick.html',
})
export class BorderLegoBrick {
  /**
   * CSS class for the border color (from app palette).
   * Options: 'border-deep-purple' (default), 'border-soft-teal', 'border-vibrant-orange'
   */
  colorClass = input<BorderBrickColor>('border-deep-purple');

  /**
   * Color map for CSS variable values
   */
  private readonly colorMap: Record<BorderBrickColor, string> = {
    'border-deep-purple': '#6e026f',
    'border-soft-teal': '#abdadc',
    'border-vibrant-orange': '#fa891a',
  };

  /**
   * Returns the style object with CSS variable
   */
  containerStyle = computed(() => ({
    '--brick-border-color': this.colorMap[this.colorClass()],
  }));
}
