import { Component, input, output, signal } from '@angular/core';
import { ViewSyllable, ViewSyllableForShow } from '../quest/store/quest.types';
import { LegoBrick } from '../../layout/lego/lego-brick/lego-brick';

@Component({
  selector: 'app-syllables',
  templateUrl: './syllables.html',
  imports: [LegoBrick],
})
export class Syllables {
  syllables = input.required<ViewSyllable[]>();
  showingSyllables = input.required<ViewSyllableForShow[]>();
  fakeCount = input<number>(0);
  correctSyllable = output<ViewSyllable>();

  private shakingSyllables = signal<Set<string>>(new Set());

  protected isShaking(syllable: string): boolean {
    return this.shakingSyllables().has(syllable);
  }

  protected onSyllableClick(event: ViewSyllableForShow): void {
    // Find the first incomplete correct syllable that matches the clicked text
    const firstIncompleteMatch = this.syllables()
      .filter(s => s.isReal && !s.isDone)
      .find(s => s.syllable === event.syllable);

    if (!firstIncompleteMatch) {
      this.addShakingSyllable(event.syllable);
      setTimeout(() => this.removeShakingSyllable(event.syllable), 500);
      return;
    }
    this.correctSyllable.emit(firstIncompleteMatch);
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
}
