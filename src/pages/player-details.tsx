import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectSinglePlayer } from '../redux/player/selectors';
import { Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const PlayerDetailsPage = () => {
    const { id } = useParams<{id: string}>();
    const player = useSelector(selectSinglePlayer(id));

  return (
    <>
        <Box display="flex" m={0} p={2} flexDirection="column" width="100vw" height="100vh" justifyContent="center" alignItems="center">
            <Typography gutterBottom component="h1">
            {player?.first_name + ' ' + player?.last_name}
            </Typography>

        <p>Height: {player?.height_feet ? player.height_feet + ' ft ' + player.height_inches : 'NO INFO'}</p>
        <p>Position: {player?.position}</p>
        <p>Weight: {player?.weight_pounds && 'NO INFO'}</p>

        <>Team: {player?.team.full_name}</>
        </Box>
    </>
  )
}

export default PlayerDetailsPage;