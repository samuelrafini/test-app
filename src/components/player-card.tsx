import React, {FC} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 345,
    margin: 5,
  },
});

interface Props {
    playerName: string;
    onClick: () => void;
} 

const PlayerCard: FC<Props> = ({playerName, onClick}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} onClick={onClick}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom component="p">
            {playerName}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default PlayerCard;