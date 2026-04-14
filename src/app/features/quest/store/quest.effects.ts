import { inject } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { QuestActions } from './quest.actions';
import {
  CURRENT_VERSION,
  STORAGE_KEY,
  ProgressData,
  ProgressEntry,
  isValidProgressData,
  migrateToCurrentVersion,
} from './quest.types';

const rootInit = (actions$ = inject(Actions)) =>
  actions$.pipe(
    ofType(ROOT_EFFECTS_INIT),
    map(() => QuestActions.loadSavedProgress())
  );

const saveProgress = (actions$ = inject(Actions)) =>
  actions$.pipe(
    ofType(QuestActions.completeQuest),
    map(({ questId }) => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const existing: ProgressData = raw ? (JSON.parse(raw) as ProgressData) : { v: CURRENT_VERSION, progresses: [] };
        const updated = migrateToCurrentVersion(existing);
        const next = new Map<number, boolean>(updated.progresses.map(p => [p.questId, p.isDone]));
        next.set(questId, true);
        const data: ProgressData = {
          v: CURRENT_VERSION,
          progresses: Array.from(next.entries()).map(([questId, isDone]) => ({
            questId,
            isDone,
          })),
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        return QuestActions.saveProgressSuccess();
      } catch (e) {
        return QuestActions.storeError({
          error: e instanceof Error ? e : new Error(String(e)),
        });
      }
    })
  );

const loadProgress = (actions$ = inject(Actions)) =>
  actions$.pipe(
    ofType(QuestActions.loadSavedProgress),
    map(() => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) {
          return QuestActions.hydrateQuestProgress({ progresses: [] });
        }
        const data = JSON.parse(raw) as Partial<ProgressData>;
        const valid = isValidProgressData(data);
        if (!valid) {
          return QuestActions.hydrateQuestProgress({ progresses: [] });
        }
        const migrated = migrateToCurrentVersion(data);
        const entries: ProgressEntry[] = migrated.progresses || [];
        return QuestActions.hydrateQuestProgress({ progresses: entries });
      } catch (e) {
        return QuestActions.storeError({
          error: e instanceof Error ? e : new Error(String(e)),
        });
      }
    })
  );

export const questEffects = {
  rootInit: createEffect(rootInit, { functional: true, dispatch: true }),
  saveProgress: createEffect(saveProgress, { functional: true, dispatch: true }),
  loadProgress: createEffect(loadProgress, { functional: true, dispatch: true }),
};
