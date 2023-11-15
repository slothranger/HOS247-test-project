import { createReducer, on } from "@ngrx/store";
import { AppActions } from "./app.actions";
import { Item } from "../services/data.service";

export interface AppState {
  items: Item[],
  selectedItems: Item[],
}

export const initialState: AppState = {items: [], selectedItems: []};
 
export const appReducer = createReducer(
  initialState,
  on(AppActions.addSelectedItem, (state, item) => {
    return {...state, selectedItems: [...state.selectedItems, item]};
  }),
  on(AppActions.updateLastSelectedItem, (state, item) => {
    return {...state, selectedItems: [...state.selectedItems.slice(-1), item]};
  }),
  on(AppActions.removeLastSelectedItem, (state, {count}) => {
    return {...state, selectedItems: [...state.selectedItems.slice(0, -count)]};
  }),
);