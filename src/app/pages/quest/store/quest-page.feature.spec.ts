import { QuestPageActions } from './quest-page.actions';
import { questFeature } from './quest-page.feature';
import { QuestPageState } from './quest-page.types';

describe('QuestPageStore', () => {
  describe('QuestPageState type', () => {
    it('should be available for import', () => {
      const state: QuestPageState = { isLoading: false };
      expect(state.isLoading).toBe(false);
    });
  });

  describe('initial state', () => {
    it('should have isLoading as false', () => {
      const state = questFeature.reducer(undefined, { type: 'INIT' } as any);
      expect(state.isLoading).toBe(false);
    });
  });

  describe('setLoading action', () => {
    it('should update isLoading to true', () => {
      const result = questFeature.reducer(
        { isLoading: false },
        QuestPageActions.setLoading({ isLoading: true }),
      );
      expect(result.isLoading).toBe(true);
    });

    it('should update isLoading to false', () => {
      const result = questFeature.reducer(
        { isLoading: true },
        QuestPageActions.setLoading({ isLoading: false }),
      );
      expect(result.isLoading).toBe(false);
    });
  });

  describe('selectors', () => {
    it('should select isLoading state', () => {
      const selectIsLoading = questFeature.selectIsLoading;
      expect(selectIsLoading({ quest: { isLoading: true } })).toBe(true);
    });
  });
});
