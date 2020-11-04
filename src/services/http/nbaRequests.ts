import { Player, PaginationMeta, SeasonAverages } from '../../interfaces';
import fetchApi from '../../utils/fetchApi';
import { defaultHeaders } from '../../utils/fetchApi';

type AllPlayerResponse = {
  data: Player[],
  meta: PaginationMeta,
};

const playersEndpoint = '/players';
const seasonAveragesEndpoint = '/season_averages';

export const fetchPlayers = ({perPage = 100, search = '', page = 1}) => {
  const endpoint = `${playersEndpoint}?page=${page}&per_page=${perPage}&search=${search}`;

  return fetchApi<AllPlayerResponse>(endpoint, {
    method: 'GET',
    headers: {
      ...defaultHeaders,
    },
  });
};

export const fetchPlayerByID = (id: number) => {
  const endpoint = `${playersEndpoint}/${id}`;

  return fetchApi<Player>(endpoint, {
    method: 'GET',
    headers: {
      ...defaultHeaders,
    },
  });
};

export const fetchSeasonAverages = (playerIds: number[]) => {
  const endpoint = `${seasonAveragesEndpoint}?player_ids[]=${playerIds.toString()}`;

  return fetchApi<SeasonAverages>(endpoint, {
    method: 'GET',
    headers: {
      ...defaultHeaders,
    },
  });
};
