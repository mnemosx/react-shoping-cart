import React, { useState, useEffect } from 'react';
import Product from './components/Product';
import SelectedItems from './components/SelectedItems';
import TotalPrice from './components/TotalPrice';
import items from './components/ShopItems';
import SearchAppBar from './components/TopBar';
import { AppTheme, theme1, theme2 } from './components/ThemeSwitcher';
import { Grid, CssBaseline, CircularProgress } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Checkout from './components/Checkout';
import { calculateItemPrice } from './requests'

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  img: string;
  quantity: number;
  cartQuantity: number;
  discount: string
}

// res.send(`${(price * body.quantity) - (price * Math.floor(body.quantity / sale[0]))} EUR`);
// get total price
const calcTotalSum = (items: ShopItem[]): number => {
  // let totalSum = items.reduce((a, b) => a + b.price * b.cartQuantity, 0)
  // return parseFloat(totalSum.toFixed(2))


  let sum = 0;
  for (let i = 0; i < items.length; i++) {
    // console.log(calculateTotalPriceForItem(items[i].price, items[i].cartQuantity, items[i].discount))

    sum += calculateTotalPriceForItem(items[i].price, items[i].cartQuantity, items[i].discount);

  }
  return parseFloat(sum.toFixed(2));
}


export function calculateTotalPriceForItem(price: number, cartQuantity: number, discount: string): number {

  let priceWithDiscount = 0
  if (discount === 'sale') {
    if (cartQuantity % 3 === 0) {
      priceWithDiscount = (price * cartQuantity) - (price * Math.floor((cartQuantity / 3)));
      console.log(priceWithDiscount)
      return priceWithDiscount;

    } else if (cartQuantity % 3 === 1 && cartQuantity > 3) {
      console.log(priceWithDiscount + price)
      return priceWithDiscount + price;
    }
    else if (cartQuantity % 3 === 2 && cartQuantity > 3) {
      return priceWithDiscount + price + price;
    }
  }
  return price * cartQuantity;
  // isauc ar {calculateTotalPriceForItem(price, quantity, status)}
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


  // Iznest atsevišķā komponentē?
  const ShopItemsOnLeft = (): any => {
    return <Grid item container spacing={2} xs={8} style={{
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
        /></Grid>)}
    </Grid>
  }

  return (
    <Router>
      <MuiThemeProvider theme={currentTheme === AppTheme.theme1 ? theme1 : theme2}>
        <CssBaseline />
        <SnackbarProvider maxSnack={3} autoHideDuration={900} preventDuplicate>
          <div style={{ overflowX: 'hidden' }}>
            <SearchAppBar setTheme={(theme: AppTheme) => setCurrentTheme(theme)} currentTheme={currentTheme} />
            <Grid container spacing={5} style={{
              padding: '60px 30px',
              margin: '60px 0 0 0',
            }}>
              {/* Left Side */}
              <Route path="/" exact component={ShopItemsOnLeft} />
              <Route path="/checkout" component={Checkout} />
              {/* Right Side */}
              <Grid item container xs={4} style={{
                borderRadius: 5,
                position: 'fixed',
                height: '85vh',
                paddingRight: '40px',
                right: 0,
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
    </Router>
  );
}

export default App;
