import React, { useState } from 'react';
import Product from './Product';
import SelectedItem from './SelectedItem';
import TotalPrice from './TotalPrice';
import items from './ShopItems';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import './App.css';
import SearchAppBar from './TopBar';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    img: {
      widht: 100,
      height: 100,
    }
  }),
);

interface ShopItem {
  quantity: number;
  name: string;
  description: string;
  price: number;
  img: string;
}

// get total price
const calcTotalSum = (items: ShopItem[]): number => {
  let totalSum = items.reduce((a, b) => a + b.price * b.quantity, 0)
  return parseFloat(totalSum.toFixed(2))
}

const App: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<ShopItem[]>([])
  const classes = useStyles();
  return (
    // <div className="App">
    ///* Outer Window Container */ 
    // className={classes.paper}
    <div>
      <SearchAppBar />

      <Grid container spacing={5} style={{
        padding: '60px',
        margin: 0,
      }}>
        {/* Left Side */}
        <Grid item container alignContent='flex-start' justify='center' spacing={2} xs={8} style={{
          backgroundColor: '#e9e3f1',
          textAlign: 'center'
        }}>
          {items.map(item => <Grid item xs={4}>
            <Product
              name={item.name}
              description={item.description}
              price={item.price}
              img={item.img}
              //onSelect={() => { setSelectItems([...selectedItems, item]) }}
              onSelect={() => {
                const cartItems = [...selectedItems];
                let isCurrentItem = function (element: ShopItem): boolean {
                  return element.name === item.name;
                };
                if (!cartItems.some(isCurrentItem)) {
                  cartItems.push(item);
                } else {
                  item.quantity++;
                }
                setSelectedItems(cartItems)
              }}
            /></Grid>)}
        </Grid>
        {/* Right Side */}
        <Grid item container xs={4} style={{
          backgroundColor: '#462f65',
          borderRadius: 15,
          boxShadow: '0px 5px 45px 0px rgba(0, 11, 47, 0.65)',
        }} >
          <Grid item container alignContent='flex-start' spacing={2}>
            {selectedItems.map((item, index) =>
              <Grid item xs={12}>
                <SelectedItem
                  img={item.img}
                  name={item.name}
                  quantity={item.quantity}
                  onRemove={() => {
                    if (item.quantity > 1) {
                      item.quantity--
                    } else {
                      selectedItems.splice(index, 1)
                    }
                    setSelectedItems([...selectedItems])
                  }}
                // jaunā pogā remove all
                // selectedItems.splice(index, 1)
                // setSelectedItems([...selectedItems])
                /></Grid>)}
          </Grid>
          <Grid item xs={12} spacing={2} style={{ height: 'auto', alignSelf: 'flex-end' }} >
            <TotalPrice price={calcTotalSum(selectedItems)} />
          </Grid>
        </Grid>
      </Grid>

    </div >
  );
}

export default App;