export interface Player {
  id: number,
  first_name: string,
  last_name: string,
  position: string,
  height_feet: number,
  height_inches: number,
  weight_pounds: number,
  team: {
    id: number,
    abbreviation: string,
    city: string,
    conference: string,
    division: string,
    full_name: string,
    name: string,
  };
  seasonAverages?: SeasonAverages
}

export interface PaginationMeta {
  total_pages: number,
  current_page: number,
  next_page: number,
  per_page: number, 
  total_count: number,
};

export interface ErrorResponse {
  code: number;
};

export interface FetchPlayersRequest {
  perPage: number,
  search: string,
  page: number,
}

export interface FetchSeasonAvgRequest {
    perPage: number,
    search: string,
    page: number,
  }

export interface SeasonAverages {
  games_played: number;
  player_id: number;
  season: number;
  min: string;
  fgm: number;
  fga: number;
  fg3m: number;
  fg3a: number;
  ftm: number;
  fta: number;
  oreb: number;
  dreb: number;
  reb: number;
  ast: number;
  stl: number;
  blk: number;
  turnover: number;
  pf: number;
  pts: number;
  fg_pct: number;
  fg3_pct: number;
  ft_pct: number;
};
