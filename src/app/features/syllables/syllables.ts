import { Component, computed, input, inject } from '@angular/core';
import { LegoBrick } from '../../layout/lego-brick/lego-brick';
import { SyllableService } from '../../core/services/syllable.service';

type SyllableColor = 'lego-deep-purple' | 'lego-soft-teal' | 'lego-vibrant-orange';

interface SyllableItem {
  value: string;
  colorClass: SyllableColor;
}

const SYLLABLE_COLORS: SyllableColor[] = ['lego-deep-purple', 'lego-soft-teal', 'lego-vibrant-orange'];

@Component({
  selector: 'app-syllables',
  templateUrl: './syllables.html',
  imports: [LegoBrick],
})
export class Syllabes {
  private syllableService = inject(SyllableService);

  word = input.required<string>();
  fakeCount = input<number>(0);

  syllables = computed<SyllableItem[]>(() => {
    const word = this.word();
    if (!word || word.length === 0) {
      return [];
    }
    const texts = this.syllableService.generateSyllableSet(word, this.fakeCount()).all;
    return texts.map(text => ({
      value: text,
      colorClass: this.getRandomColor(),
    }));
  });

  private getRandomColor(): SyllableColor {
    const index = Math.floor(Math.random() * SYLLABLE_COLORS.length);
    return SYLLABLE_COLORS[index];
  }
}
