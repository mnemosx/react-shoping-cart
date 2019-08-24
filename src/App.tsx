import React, { useState, useEffect } from 'react';
import Product from './components/Product';
import TotalPrice, { calcTotalSum } from './components/TotalPrice';
import items from './components/ShopItems';
import SearchAppBar from './components/TopBar';
import { AppTheme, theme1, theme2 } from './components/ThemeSwitcher';
import { Grid, CssBaseline, CircularProgress } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import SelectedItems from './components/SelectedItems';
import { calculateItemPrice } from './requests'

export interface ShopItem {
  id: string;
  quantity: number;
  cartQuantity: number;
  name: string;
  description: string;
  price: number;
  img: string;
}

// localstorage
//ERROR - pārlādējot lapu ar precēm localstorage, tās pašas precces pievienojot neskaitās counter
let localItems: ShopItem[] = [];
let localStorageContent = localStorage.getItem('uniqueKEY')
if (localStorageContent) {
  localItems = JSON.parse(localStorageContent)
}

const App: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<ShopItem[]>(localItems)
  const [currentTheme, setCurrentTheme] = useState<AppTheme>(AppTheme.theme1)
  const cartItems = [...selectedItems];
  const [isLoading, setLoading] = useState<boolean>(true)
  const [products, setProducts] = useState<ShopItem[]>([])
  useEffect(() => {
    calculateItemPrice('1', 1)
      .then(it => console.log(it))

    fetch('/alpha/items')
      .then(res => res.json())
      .then(json => {
        const promises = (json.items as any[])
          .map(it => {
            return {
              id: it.id,
              name: it.name,
              description: it.description,
              price: 0,
              img: it.img,
              quantity: 0,
              cartQuantity: 0,
              discount: false,
            } as ShopItem
          })
          .map(it => {
            return calculateItemPrice(it.id, 1)
              .then(price => {
                return { ...it, price: price }
              })
          })

        Promise.all(promises)
          .then(receivedProducts => {
            setProducts(receivedProducts)
            setLoading(false)
          })
      })
  }, [])

  return (
    <MuiThemeProvider theme={currentTheme === AppTheme.theme1 ? theme1 : theme2}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3} autoHideDuration={900} preventDuplicate>
        <div style={{ overflowX: 'hidden' }}>
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
              {isLoading ? <CircularProgress color="secondary" /> :
                (products.map(it => <Grid item xs={4}>
                  <Product
                    name={it.name}
                    description={it.description}
                    price={it.price}
                    img={it.img}
                    quantity={it.quantity}
                    onSelect={() => {
                      let isCurrentItem = function (element: ShopItem): boolean {
                        return element.name === it.name;
                      };
                      if (!cartItems.some(isCurrentItem)) {
                        cartItems.push(it);
                        it.cartQuantity++;
                        it.quantity--
                      } else {
                        it.cartQuantity++;
                        it.quantity--
                      }
                      setSelectedItems(cartItems)
                      localStorage.setItem('uniqueKEY', JSON.stringify(cartItems));
                    }}
                  /></Grid>))}
            </Grid>
            {/* Right Side */}
            <Grid item container style={{
              borderRadius: 15,
              background: 'rgba(52, 60, 70, 0.4)',
              boxShadow: '0px 5px 35px 0px rgba(0, 0, 0, 0.3)',
              position: 'fixed',
              right: '4%',
              height: '80vh',
              width: '500px',
              overflowY: 'auto',
            }} >
              <Grid item container alignContent='flex-start' spacing={2}>
                {selectedItems.map((item, index) =>
                  <Grid item xs={12}>
                    <SelectedItems
                      img={item.img}
                      name={item.name}
                      quantity={item.quantity}
                      cartQuantity={item.cartQuantity}
                      onRemove={() => {
                        if (item.cartQuantity > 1) {
                          item.cartQuantity--
                          item.quantity++
                        } else if (item.cartQuantity === 1) {
                          selectedItems.splice(index, 1)
                          item.cartQuantity--
                          item.quantity++
                        }
                        setSelectedItems([...selectedItems])
                        localStorage.setItem('uniqueKEY', JSON.stringify(selectedItems));
                      }}
                    // jaunā pogā remove all
                    // selectedItems.splice(index, 1)
                    // setSelectedItems([...selectedItems])
                    /></Grid>)}
              </Grid>
              <Grid item xs={12} style={{ height: 'auto', alignSelf: 'flex-end' }} >
                <TotalPrice price={calcTotalSum(selectedItems)} />
              </Grid>
            </Grid>
          </Grid>
        </div>
      </SnackbarProvider>
    </MuiThemeProvider >
  );
}

export default App;