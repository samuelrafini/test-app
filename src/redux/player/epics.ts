import { combineEpics, Epic } from 'redux-observable';
import { filter, mergeMap, debounceTime } from 'rxjs/operators';

import { isActionOf, RootAction, RootState } from 'typesafe-actions';
import { getPlayers, getPlayersSuccess, getPlayersFailed } from './actions';
import { fetchPlayers, fetchSeasonAverages } from '../../services/http/nbaRequests';
import { Player, SeasonAverages } from '../../interfaces';

export const getPlayersEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) => {
    return action$.pipe(
        debounceTime(500),
        filter(isActionOf(getPlayers)),
        mergeMap(async ({payload}) => {
            const response = await fetchPlayers({search: payload.search, page: payload.page, perPage: payload.perPage});
            if (response.data) {
              const playersIds = response.data.map((player: Player) => player.id);
              const playersAvg = await fetchSeasonAverages(playersIds);

              const findAvg = (id: number) => playersAvg.data.find((item: SeasonAverages) => item.player_id === id);

              const players: Player[] = response.data.map((player: Player) => ({...player, seasonAverage: findAvg(player.id)}))
              return getPlayersSuccess({data: players, meta: response.meta})
            }
            return getPlayersFailed(response);
        }),
    )
};

export const playerEpics = combineEpics(
  getPlayersEpic
);

