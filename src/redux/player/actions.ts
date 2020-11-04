import { createAction } from 'typesafe-actions';
import { FetchPlayersRequest, Player, PaginationMeta, ErrorResponse } from '../../interfaces';

export const getPlayers = createAction("GET_PLAYERS")<FetchPlayersRequest>();
export const getPlayersSuccess = createAction("GET_PLAYERS_SUCCESS")<{data: Player[]; meta: PaginationMeta}>();
export const getPlayersFailed = createAction("GET_PLAYERS_FAILED")<ErrorResponse>();
