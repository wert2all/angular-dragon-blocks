import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TaskComponent } from '../../features/quest/components/task/task';
import { QuestActions } from '../../features/quest/store/quest.actions';
import { questFeature } from '../../features/quest/store/quest.feature';
import { Syllables } from '../../features/syllables/syllables';
import { ViewSyllable } from '../../features/quest/store/quest.types';
import { SaluteAnimationComponent } from '../../features/celebration/salute-animation';

@Component({
  selector: 'app-quest',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Syllables, TaskComponent, SaluteAnimationComponent],
  templateUrl: './quest.html',
})
export class QuestPage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly store = inject(Store);

  protected readonly activeQuest = this.store.selectSignal(questFeature.selectActiveQuest);
  protected readonly activeTaskQuest = this.store.selectSignal(questFeature.selectTaskQuest);
  protected readonly allQuests = this.store.selectSignal(questFeature.selectList);
  protected readonly showCongrats = signal(false);

  protected readonly navigation = computed(() => {
    const quests = this.allQuests();
    const current = this.activeQuest();
    if (!current || quests.length === 0) {
      return {
        hasPrev: false,
        hasNext: false,
        prevId: null as number | null,
        nextId: null as number | null,
      };
    }
    const sorted = [...quests].sort((a, b) => a.id - b.id);
    const currentIndex = sorted.findIndex(q => q.id === current.id);
    const hasPrev = currentIndex > 0;
    const hasNext = currentIndex >= 0 && currentIndex < sorted.length - 1;
    return {
      hasPrev,
      hasNext,
      prevId: hasPrev ? sorted[currentIndex - 1].id : null,
      nextId: hasNext ? sorted[currentIndex + 1].id : null,
    };
  });

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

  protected navigateToQuest(questId: number): void {
    this.router.navigate(['/quest', questId]);
    this.store.dispatch(QuestActions.setActiveQuest({ questId }));
  }

  protected onContinueToMap(): void {
    this.router.navigate(['/map']);
  }

  protected onAnimationComplete() {
    //todo
  }
}
