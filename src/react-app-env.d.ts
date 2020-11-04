import { StateType, ActionType } from 'typesafe-actions';

/// <reference types="react-scripts" />

declare module 'typesafe-actions' {
  export type Store = StateType<typeof import('./redux/store').default>;

  export type RootState = StateType<typeof import('./redux/rootReducer').default>;

  export type RootAction = ActionType<typeof import('./redux/rootAction').default>;

  interface Types {
    RootAction: RootAction;
  }
}