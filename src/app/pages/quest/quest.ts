import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Syllabes } from '../../features/syllables/syllables';
import { TaskComponent } from '../../features/quest/components/task/task';
import { Store } from '@ngrx/store';
import { QuestActions } from '../../features/quest/store/quest.actions';
import { questFeature } from '../../features/quest/store/quest.feature';

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
}
