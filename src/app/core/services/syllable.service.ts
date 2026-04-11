import { Injectable } from '@angular/core';

const UKRAINIAN_VOWELS = ['а', 'е', 'є', 'и', 'і', 'ї', 'о', 'у', 'ю', 'я', 'А', 'Е', 'Є', 'И', 'І', 'Ї', 'О', 'У', 'Ю', 'Я'];

@Injectable({ providedIn: 'root' })
export class SyllableService {
  splitUkrainianWord(word: string): string[] {
    if (!word || word.length === 0) return [];

    const syllables: string[] = [];
    let current = '';

    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      current += char;

      if (this.isVowel(char) && i < word.length - 1) {
        const nextChar = word[i + 1];
        if (!this.isVowel(nextChar)) {
          syllables.push(current);
          current = '';
        }
      }
    }

    if (current.length > 0) {
      syllables.push(current);
    }

    return syllables;
  }

  private isVowel(char: string): boolean {
    return UKRAINIAN_VOWELS.includes(char);
  }

  generateFakeSyllables(word: string, count: number): string[] {
    if (count <= 0) return [];

    const realSyllables = this.splitUkrainianWord(word);
    const consonants = this.extractConsonants(word);
    const vowels = UKRAINIAN_VOWELS.filter(v => v === v.toLowerCase());

    const fakes: string[] = [];
    let attempts = 0;
    const maxAttempts = count * 10;

    while (fakes.length < count && attempts < maxAttempts) {
      attempts++;
      const fake = this.createFakeSyllable(consonants, vowels);
      if (!realSyllables.includes(fake) && !fakes.includes(fake)) {
        fakes.push(fake);
      }
    }

    return fakes;
  }

  private extractConsonants(word: string): string[] {
    const unique = new Set<string>();
    for (const char of word) {
      if (!this.isVowel(char) && this.isUkrainianChar(char)) {
        unique.add(char.toLowerCase());
      }
    }
    return Array.from(unique);
  }

  private isUkrainianChar(char: string): boolean {
    return /[\u0400-\u04FF]/.test(char);
  }

  private createFakeSyllable(consonants: string[], vowels: string[]): string {
    const useConsonant = consonants.length > 0 && Math.random() > 0.3;
    const consonant = useConsonant
      ? consonants[Math.floor(Math.random() * consonants.length)]
      : '';
    const vowel = vowels[Math.floor(Math.random() * vowels.length)];
    return consonant + vowel;
  }

  shuffle<T>(array: T[]): T[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  generateSyllableSet(word: string, fakeCount: number): { real: string[]; all: string[] } {
    const real = this.splitUkrainianWord(word);
    const fakes = this.generateFakeSyllables(word, fakeCount);
    const all = this.shuffle([...real, ...fakes]);
    return { real, all };
  }
}
