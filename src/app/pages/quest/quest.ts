import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { TaskComponent } from '../../features/quest/components/task/task';
import { QuestActions } from '../../features/quest/store/quest.actions';
import { questFeature } from '../../features/quest/store/quest.feature';
import { Syllables } from '../../features/syllables/syllables';
import { ViewSyllable } from '../../features/quest/store/quest.types';
import { CongratsModalComponent } from '../../features/celebration/congrats-modal/congrats-modal';

@Component({
  selector: 'app-quest',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Syllables, TaskComponent, CongratsModalComponent],
  templateUrl: './quest.html',
})
export class Quest {
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(Store);
  protected readonly activeQuest = this.store.selectSignal(questFeature.selectActiveQuest);
  protected readonly activeTaskQuest = this.store.selectSignal(questFeature.selectTaskQuest);

  protected readonly showCongrats = signal(false);

  protected readonly isQuestComplete = computed(() => {
    const quest = this.activeQuest();
    if (!quest) {
      return false;
    }
    return quest.correctSyllables.every(syllable => syllable.isDone);
  });

  constructor() {
    const questId = Number(this.route.snapshot.paramMap.get('id') ?? '0');
    this.store.dispatch(QuestActions.setActiveQuest({ questId }));
  }

  protected setDone(item: ViewSyllable): void {
    this.store.dispatch(QuestActions.setDoneSyllable({ id: item.id }));

    // Check if this was the last syllable
    const quest = this.activeQuest();
    if (quest) {
      const remainingSyllables = quest.correctSyllables.filter(s => !s.isDone && s.id !== item.id);
      if (remainingSyllables.length === 0) {
        this.store.dispatch(QuestActions.completeQuest({ questId: quest.id }));
        this.showCongrats.set(true);
      }
    }
  }

  protected onCloseCongrats(): void {
    this.showCongrats.set(false);
  }
}
