import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { ShopItem } from '../App';
// import items from '../components/ShopItems';


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

// get total price
export const calcTotalSum = (items: ShopItem[]): number => {
  let totalSum = items.reduce((a, b) => a + b.price * b.cartQuantity, 0)
  // let discount = { shopItem.discount }
  // if (item.discount === true) {

  // }
  // else {

  // }
  return parseFloat(totalSum.toFixed(2))
}

// let totalSumOfItem = totalSumOfIten - price * parseInt(cartQuantity / 3) 

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