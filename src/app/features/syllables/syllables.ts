import { Component, computed, input, output, signal } from '@angular/core';
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
export class Syllables {
  syllables = input.required<ViewSyllable[]>();
  fakeCount = input<number>(0);
  correctSyllable = output<{ syllable: string; color: BrickColor }>();

  private shakingSyllables = signal<Set<string>>(new Set());

  protected syllablesWithFakes = computed((): SyllableItem[] => {
    const realSyllables = this.syllables().map(s => s.syllable);
    const fakeSyllables = this.generateFakeSyllables(realSyllables, this.fakeCount());
    const allSyllables = this.shuffleArray([...realSyllables, ...fakeSyllables]);
    return allSyllables.map(text => ({
      value: text,
      colorClass: this.getRandomColor(),
    }));
  });

  protected isShaking(syllable: string): boolean {
    return this.shakingSyllables().has(syllable);
  }

  protected onSyllableClick(event: SyllableItem): void {
    const item = this.syllables().find(s => s.syllable === event.value);
    if (!item) {
      this.addShakingSyllable(event.value);
      setTimeout(() => this.removeShakingSyllable(event.value), 500);
      return;
    }
    this.correctSyllable.emit({ syllable: item.syllable, color: event.colorClass });
  }

  private addShakingSyllable(value: string): void {
    this.shakingSyllables.update(set => new Set([...set, value]));
  }

  private removeShakingSyllable(value: string): void {
    this.shakingSyllables.update(set => {
      const newSet = new Set(set);
      newSet.delete(value);
      return newSet;
    });
  }

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

  private generateFakeSyllables(realSyllables: string[], count: number): string[] {
    const fakes: string[] = [];
    const consonants = 'бвгджзйклмнпрстфхцчшщ';
    const vowels = 'аеиоуяюєїі';

    while (fakes.length < count) {
      const syllable = this.generateRandomSyllable(consonants, vowels);
      if (!realSyllables.includes(syllable) && !fakes.includes(syllable)) {
        fakes.push(syllable);
      }
    }
    return fakes;
  }

  private generateRandomSyllable(consonants: string, vowels: string): string {
    const randomConsonant = (): string => consonants[Math.floor(Math.random() * consonants.length)];
    const randomVowel = (): string => vowels[Math.floor(Math.random() * vowels.length)];

    const useConsonantFirst = Math.random() > 0.3;
    if (useConsonantFirst) {
      return randomConsonant() + randomVowel();
    }
    return randomVowel() + randomConsonant();
  }
}
