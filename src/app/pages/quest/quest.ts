import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { TaskComponent } from '../../features/quest/components/task/task';
import { QuestActions } from '../../features/quest/store/quest.actions';
import { questFeature } from '../../features/quest/store/quest.feature';
import { Syllables } from '../../features/syllables/syllables';
import { ViewSyllable } from '../../features/quest/store/quest.types';

@Component({
  selector: 'app-quest',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Syllables, TaskComponent],
  templateUrl: './quest.html',
})
export class Quest {
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(Store);

  protected readonly activeQuest = this.store.selectSignal(questFeature.selectActiveQuest);
  protected readonly activeTaskQuest = this.store.selectSignal(questFeature.selectTaskQuest);

  constructor() {
    const questId = Number(this.route.snapshot.paramMap.get('id') ?? '0');
    this.store.dispatch(QuestActions.setActiveQuest({ questId }));
  }
  protected setDone(item: ViewSyllable): void {
    this.store.dispatch(QuestActions.setDoneSyllable({ syllable: item.syllable }));
  }
}
