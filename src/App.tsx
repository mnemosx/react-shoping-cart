import React, { useState } from 'react';
import Product from './components/Product';
import SelectedItem from './components/SelectedItem';
import TotalPrice from './components/TotalPrice';
import items from './components/ShopItems';
import SearchAppBar from './components/TopBar';
import { AppTheme, theme1, theme2 } from './components/ThemeSwitcher';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { Grid, CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';

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

// localstorage
//ERROR - pārlādējot lapu ar precēm localstorage, tās pašas precces pievienotjot neskaitās counter
let localItems: ShopItem[] = [];
let localStorageContent = localStorage.getItem('uniqueKEY')
if (localStorageContent) {
  localItems = JSON.parse(localStorageContent)
}

const App: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<ShopItem[]>(localItems)
  const [currentTheme, setCurrentTheme] = useState<AppTheme>(AppTheme.theme1)

  return (
    <MuiThemeProvider theme={currentTheme === AppTheme.theme1 ? theme1 : theme2}>
      <CssBaseline />
      <div>
        <SearchAppBar setTheme={(theme: AppTheme) => setCurrentTheme(theme)} currentTheme={currentTheme} />
        <Grid container spacing={5} style={{
          padding: '60px',
          margin: 0,
        }}>
          {/* Left Side */}
          <Grid item container spacing={2} xs={8} style={{
            textAlign: 'center',
            alignContent: 'flex-start',
            justifyContent: 'center',
          }}>
            {items.map(item => <Grid item xs={4}>
              <Product
                name={item.name}
                description={item.description}
                price={item.price}
                img={item.img}
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
                  localStorage.setItem('uniqueKEY', JSON.stringify(selectedItems));
                }}
              /></Grid>)}
          </Grid>
          {/* Right Side */}
          <Grid item container xs={4} style={{
            borderRadius: 15,
            boxShadow: '0px 5px 35px 0px rgba(0, 0, 0, 0.3)',
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
                      localStorage.setItem('uniqueKEY', JSON.stringify(selectedItems));
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
      </div>
    </MuiThemeProvider>
  );
}

export default App;