import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      marginTop: '20px',
      color: theme.palette.text.secondary,
    },
    total: {
      fontWeight: 700,
      fontSize: 18,
    }
  }),
);

interface TotalPriceProps {
  price: number
}

const TotalPrice: React.FC<TotalPriceProps> = ({ price }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Typography className={classes.total} variant="button">Total: ${price}</Typography>
    </Paper>
  )
}

export default TotalPrice;