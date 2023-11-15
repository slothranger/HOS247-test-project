import { createSelector } from '@ngrx/store';
 
const appState = (state: any) => state.appState;

export const getSelectedItems = createSelector(
  appState,
  (state) => state.selectedItems,
);

export const getSelectedItem = createSelector(
  getSelectedItems,
  (selectedItems) => selectedItems.slice(-1)[0],
);