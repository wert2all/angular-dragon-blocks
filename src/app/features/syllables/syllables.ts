import { Component, computed, input } from '@angular/core';
import { BrickColor, LegoBrick } from '../../layout/lego-brick/lego-brick';
import { ViewSyllable } from '../quest/store/quest.types';

interface SyllableItem {
  value: string;
  colorClass: BrickColor;
}

const SYLLABLE_COLORS: BrickColor[] = ['lego-deep-purple', 'lego-soft-teal', 'lego-vibrant-orange'];

@Component({
  selector: 'app-syllables',
  templateUrl: './syllables.html',
  imports: [LegoBrick],
})
export class Syllabes {
  syllables = input.required<ViewSyllable[]>();
  fakeCount = input<number>(0);

  syllablesWithFakes = computed((): SyllableItem[] => {
    const realSyllables = this.syllables().map(s => s.syllable);
    const fakeSyllables = this.generateFakeSyllables(realSyllables, this.fakeCount());
    const allSyllables = this.shuffleArray([...realSyllables, ...fakeSyllables]);

    return allSyllables.map(text => ({
      value: text,
      colorClass: this.getRandomColor(),
    }));
  });

  private getRandomColor(): BrickColor {
    const index = Math.floor(Math.random() * SYLLABLE_COLORS.length);
    return SYLLABLE_COLORS[index];
  }

  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  private generateFakeSyllables(realSyllable: string[], count: number): string[] {
    const fakes: string[] = [];
    const consonants = 'бвгджзйклмнпрстфхцчшщ';
    const vowels = 'аеиоуяюєїі';

    while (fakes.length < count) {
      const useConsonant = Math.random() > 0.3;
      const syllable = useConsonant
        ? consonants[Math.floor(Math.random() * consonants.length)] + vowels[Math.floor(Math.random() * vowels.length)]
        : vowels[Math.floor(Math.random() * vowels.length)] + consonants[Math.floor(Math.random() * consonants.length)];

      if (!realSyllable.includes(syllable) && !fakes.includes(syllable)) {
        fakes.push(syllable);
      }
    }

    return fakes;
  }
}
