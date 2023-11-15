import { createActionGroup, props } from "@ngrx/store";
import { Item } from "../services/data.service";

export const AppActions = createActionGroup({
  source: 'App',
  events: {
    'Add Selected Item': props<Item>(),
    'Update Last Selected Item': props<Item>(),
    'Remove Last Selected Item': props<{ count: number }>(),
  },
});