import { Component, input, output, signal } from '@angular/core';
import { LegoBrick } from '../../layout/lego-brick/lego-brick';
import { ViewSyllable } from '../quest/store/quest.types';

@Component({
  selector: 'app-syllables',
  templateUrl: './syllables.html',
  imports: [LegoBrick],
})
export class Syllables {
  syllables = input.required<ViewSyllable[]>();
  fakeCount = input<number>(0);
  correctSyllable = output<ViewSyllable>();

  private shakingSyllables = signal<Set<string>>(new Set());

  protected isShaking(syllable: string): boolean {
    return this.shakingSyllables().has(syllable);
  }

  protected onSyllableClick(event: ViewSyllable): void {
    const item = this.syllables().find(s => s.syllable === event.syllable);
    if (!item?.isReal) {
      this.addShakingSyllable(event.syllable);
      setTimeout(() => this.removeShakingSyllable(event.syllable), 500);
      return;
    }
    this.correctSyllable.emit(item);
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
