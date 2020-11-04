import React, { useEffect, useState } from 'react';
import { Box, IconButton, InputBase, makeStyles, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getPlayers } from '../redux/player/actions';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Pagination from '@material-ui/lab/Pagination';
import PlayerCard from '../components/player-card';
import { selectPlayerPagination, selectPlayerStateLoading, selectSortedPlayers } from '../redux/player/selectors';
import { useHistory } from 'react-router-dom';

function SearchPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();


  const [sort, setSort] = useState<'up' | 'down'>();

  const players = useSelector(selectSortedPlayers(sort));
  const playerPagination = useSelector(selectPlayerPagination);
  const playerLoading = useSelector(selectPlayerStateLoading);

  const [pagination, setPagination] = useState(playerPagination);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(getPlayers({search: searchQuery, perPage: pagination.per_page, page: pagination.current_page}));
  }, [dispatch, pagination, searchQuery])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  }

  const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
    e.preventDefault();
    setPagination(prevState => ({...prevState, current_page: page}))
  }

  return (
    <Box display="flex" m={0} p={2} flexDirection="column" width="100vw" height="90vh" justifyContent="space-between" alignItems="center"> 
      <Box display="flex" justifyContent="center" m={0} p={1} bgcolor="background.paper">
        <Paper component="form" className={classes.root}>
          <InputBase
            className={classes.input}
            placeholder="Search a Nba player (Lebron James)"
            inputProps={{ 'aria-label': 'Search a Nba player' }}
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <IconButton type="button" className={classes.iconButton} aria-label="arrow up" onClick={() => setSort('up')}>
            <ArrowDropUpIcon />
          </IconButton>
          <IconButton type="button" className={classes.iconButton} aria-label="arrow up" onClick={() => setSort('down')}>
            <ArrowDropDownIcon />
          </IconButton>
        </Paper>
      </Box>
      <Box className={classes.cardWrapper}>
        {playerLoading
        ? (<h1>Loading ...</h1>)
        : players.map((player) => (<PlayerCard playerName={player.first_name + ' ' + player.last_name} onClick={() => history.push(`/player-details/${player.id}`)}/>))
        }
      </Box>
      <Pagination count={playerPagination.total_pages} page={pagination.current_page} onChange={handlePageChange} />
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  cardWrapper: {
    flexWrap: 'wrap',
    overflowY: 'auto',
    height: '100%',
  }
}));

export default SearchPage;