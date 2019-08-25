import React from 'react'
import { Button, Card, Typography, CardMedia, Paper } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
    },
    img: {
      widht: 50,
      height: 50,
      padding: theme.spacing(1),
    },
    card: {
      display: 'flex',
      alignItems: 'center',
    }
  }),
);

interface SelectedItemProps {
  img: string;
  name: string;
  quantity: number;
  cartQuantity: number;
  onRemove(): void;
}

const SelectedItems: React.FC<SelectedItemProps> = ({ img, name, cartQuantity, onRemove }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card} style={{ width: '100%' }}>
      <CardMedia className={classes.card} style={{ width: '20%', textAlign: 'center' }}>
        <img style={{ margin: '0 auto' }}
          className={classes.img}
          alt={name}
          src={img}
        />
      </CardMedia>
      <Typography variant="body1" style={{ width: '50%', textAlign: 'left' }}>
        {name}
      </Typography>
      <Typography variant="h5" color="textSecondary" style={{ width: '55px', textAlign: 'center' }}>
        <Paper className={classes.paper}>{cartQuantity}</Paper>
      </Typography>
      <Button onClick={onRemove} style={{ width: '15%', textAlign: 'center', margin: '20px', padding: '10px 0' }}>Remove</Button>
    </Card>
  )
}

export default SelectedItems;