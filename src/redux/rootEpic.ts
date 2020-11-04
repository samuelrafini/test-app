import { combineEpics } from 'redux-observable';
import { playerEpics } from './player/epics';

export default combineEpics(
  playerEpics,
);