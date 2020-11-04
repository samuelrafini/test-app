import { RootState } from 'typesafe-actions';
import { PlayerState } from './reducers';
import { Player } from '../../interfaces';

export const selectPlayerState = (state: RootState): PlayerState => state.player;
export const selectPlayerStateLoading = (state: RootState) => selectPlayerState(state).loading;
export const selectPlayerPagination = (state: RootState) => selectPlayerState(state).pagination;
export const selectPlayers = (state: RootState) => selectPlayerState(state).players;

export const selectSinglePlayer = (id: string) => {
  return (state: RootState) => {
    return selectPlayers(state).find(player => player.id === parseInt(id));
  };
}

export const selectSortedPlayers = (direction: 'up' | 'down' | undefined) => (state: RootState) => {
    if (direction) {
        const sortedPlayer = selectPlayers(state).sort(sortByPlayerName);
        return direction === 'up' ? sortedPlayer : sortedPlayer.reverse();
    }
    return selectPlayers(state);
}

const sortByPlayerName = (a: Player, b: Player) => {
    const aName = a.first_name + a.last_name;
    const bName = b.first_name + b.last_name;

    return aName < bName ? -1 : (aName > bName ? 1 : 0)
};