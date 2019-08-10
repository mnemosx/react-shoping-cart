import React from 'react';
import { Paper, Grid } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import './App.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    img: {
      widht: 100,
      height: 100
    }
  }),
);

interface TotalPriceProps {
  price: number
}

const TotalPrice: React.FC<TotalPriceProps> = ({ price }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} className={classes.paper}>
      <Paper className={classes.paper}> Total: ${price}</Paper>
    </Grid>
  )
}

export default TotalPrice;