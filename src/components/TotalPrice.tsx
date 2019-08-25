import React from 'react';
import { Paper, Typography, Grid } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { ShopItem } from '../App';
// import items from '../components/ShopItems';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      marginTop: '20px',
      color: theme.palette.text.secondary,
      // width: '50%'
    },
    total: {
      fontWeight: 700,
      fontSize: 18,
    },
    checkoutBtn: {
      fontWeight: 700,
      fontSize: 18,
      textDecoration: 'none',
      color: theme.palette.text.secondary
    },
  })
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
    // <div className={classes.root}>
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Paper className={classes.paper}>
          <Typography className={classes.total} variant="button">Total: ${price}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Link to="/checkout">
          <Paper className={classes.paper}>
            <Typography className={classes.checkoutBtn} variant="button">Checkout</Typography>
          </Paper>
        </Link>
      </Grid>
    </Grid>
    // </div>
  )
}

export default TotalPrice;
