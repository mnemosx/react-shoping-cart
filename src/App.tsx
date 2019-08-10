import React, { useState } from 'react';
import Product from './Product';
import SelectedItem from './SelectedItem';
import TotalPrice from './TotalPrice';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';
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
      height: 100,
    }
  }),
);

interface ShopItem {
  name: string;
  description: string;
  price: number;
  img: string;
}

const items: ShopItem[] = [
  {
    name: 'Bacon Air Freshener',
    description: 'Sizzling Bacon Aroma',
    price: 1.99,
    img: './media/bacon.png'
  },
  {
    name: 'British Accent Spray',
    description: 'Sound Richer, Sound Smarter!',
    price: 4.49,
    img: './media/britt.png'
  },
  {
    name: 'Irish Accent Gum',
    description: 'Flawless Accent & Great Taste Too!',
    price: 0.99,
    img: './media/irish.png'
  },
  {
    name: 'Jesus Bandages',
    description: 'JeSUs wiLL SAvE yOu!',
    price: 2.99,
    img: './media/jesus.png'
  }, {
    name: 'Trump Toilet Paper',
    description: 'You Know You Want It',
    price: 5,
    img: './media/trump.png'
  },
  {
    name: 'Unicorn Horn',
    description: 'One Size Fits All!',
    price: 7.99,
    img: './media/unicorn.png'
  }
]

// get full price
const calcTotalSum = (items: ShopItem[]): number => {
  let totalSum = items.reduce((a, b) => a + b.price, 0)
  return parseFloat(totalSum.toFixed(2))
}

const App: React.FC = () => {
  const [selectedItems, setSelectItems] = useState<ShopItem[]>([])
  const classes = useStyles();
  return (
    <div className="App">
      {/* Outer Window Container */}
      <Paper className={classes.paper}>
        <Grid container spacing={3}>
          {/* Left Side */}
          <Grid item container alignContent='flex-start' spacing={2} xs={6}>
            {items.map(item => <Grid item xs={4}><Product
              name={item.name}
              description={item.description}
              price={item.price}
              img={item.img}
              onSelect={() => { setSelectItems([...selectedItems, item]) }}
            /></Grid>)}
          </Grid>
          {/* Right Side */}
          <Grid item container xs={6}>
            <Grid item container alignContent='flex-start' spacing={2} xs={12}>
              {selectedItems.map((item, index) =>
                <Grid item xs={12}>
                  <SelectedItem
                    name={item.name}
                    quantity={1}
                    onRemove={() => {
                      selectedItems.splice(index, 1)
                      setSelectItems([...selectedItems])
                    }}
                  />
                </Grid>)}
            </Grid>
            <Grid item>
              <TotalPrice price={calcTotalSum(selectedItems)} />
            </Grid>
          </Grid>
        </Grid>
      </Paper>

    </div >
  );
}

export default App;