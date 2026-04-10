import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import { AppState } from "./app.types";
import { AppActions } from "./app.actions";

const initState: AppState = {
  loading: false,
  isVolumeOn: true,
};

export const appFeature = createFeature({
  name: "app",
  reducer: createReducer(
    initState,

    on(
      AppActions.toggleSound,
      (state): AppState => ({ ...state, isVolumeOn: !state.isVolumeOn }),
    ),
  ),
  extraSelectors: ({ selectIsVolumeOn }) => {
    return {
      isVolumeOn: createSelector(selectIsVolumeOn, (isVolumeOn) => isVolumeOn),
    };
  },
});
