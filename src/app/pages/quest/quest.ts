import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { TaskComponent } from '../../features/quest/components/task/task';
import { QuestActions } from '../../features/quest/store/quest.actions';
import { questFeature } from '../../features/quest/store/quest.feature';
import { Syllabes } from '../../features/syllables/syllables';
import { BrickColor } from '../../layout/lego-brick/lego-brick';

@Component({
  selector: 'app-quest',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Syllabes, TaskComponent],
  templateUrl: './quest.html',
})
export class Quest {
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(Store);

  protected readonly activeQuest = this.store.selectSignal(questFeature.selectActiveQuest);

  constructor() {
    const questId = Number(this.route.snapshot.paramMap.get('id') ?? '0');
    this.store.dispatch(QuestActions.setActiveQuest({ questId }));
  }
  protected setDone(item: { syllable: string; color: BrickColor }) {
    this.store.dispatch(QuestActions.setDoneSyllable({ syllable: item.syllable, color: item.color }));
  }
}
