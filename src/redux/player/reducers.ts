import { createReducer } from 'typesafe-actions';
import { Player, PaginationMeta, ErrorResponse } from '../../interfaces';

export interface PlayerState {
    players: Player[];
    pagination: PaginationMeta;
    loading: boolean;
    error?: ErrorResponse;
}

const initState: PlayerState = {
    players: [],
    pagination: {
      total_pages: 0,
      current_page: 1,
      next_page: 0,
      per_page: 100,
      total_count: 0,
    },
    loading: false,
    error: undefined,
}

const playerReducer = createReducer<PlayerState>(initState, {
    GET_PLAYERS: (state, _) => ({...state, loading: true}),
    GET_PLAYERS_SUCCESS: (state, action) => ({...state, loading: false, players: action.payload.data, pagination: action.payload.meta}),
    GET_PLAYERS_FAILED: (state, action) => ({...state, loading: false, error: action.payload}),
});

export default playerReducer;