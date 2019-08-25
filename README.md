# Shopping cart

## A homework assignment

### Made with React & Typescript and lots of :coffee:

### Criteria:

* :heavy_check_mark: User sees a list of products on the left side;
* :heavy_check_mark: User sees the list of products he has chosen on the right side;
* :heavy_check_mark: Every product has the fields name quantity price and sum;
* :heavy_check_mark: Clicking on an item on the left should add it to the cart - Clicking on it the second time should increase the quantity - we don't want to see duplicates
* :heavy_check_mark: At the bottom of the cart users see the total component which shows the total price x quantity of items selected.
* *And at least 6 Bonus Features from these (or your own ideas):*
  * A few of the products have a discount - "Pay for 2, get 3rd one for free". Implement this logic to your cart - so that total price of the item and all cart is updated correctly as user adds/removes items to the cart.
  * On page reload the cart is not lost - you may use `localStorage`.
  * Items appear/disappear from the cart with an animation (or fly from the shop to cart via an animation) - [Spring based animations](https://www.react-spring.io/) are really nice.
  * Users can use [Drag & Drop](https://react-dnd.github.io/react-dnd/examples/dustbin/multiple-targets) to re-order the items, or add/remove them from shore to cart
  * Every 1 000 000th visitor of the site sees a popup that he is the 1 000 000th visitor of this site and he wins a car
  * There is a searchbar with an [autocomplete](https://material-ui.com/components/autocomplete/) above the products list - that filters the list of products as user types a search term
  * :heavy_check_mark: User can toggle light/dark/pink? theme of the app.
  * :heavy_check_mark: [`react-router`](https://reacttraining.com/react-router/web/guides/quick-start) or  is used to lead to the checkout page, where user goes through a [stepper](https://material-ui.com/components/steppers/) to enter his address and credit card details in a multi step process.
  * :heavy_check_mark: Some items have limited quantity, and as user tries to increase the quantity on the cart, a [snackbar](https://material-ui.com/components/snackbars/#snackbars) appears with a warning notification that the stock is limited.
  * :heavy_check_mark: Items in the shop that have a quantity 0, can't even be added to the cart (are disabled)
  * The cart is accessible even for people with disabilities - it should be possible for people to use the full functionality even for people that are unable to use the mouse - they can use <kbd>TAB</kbd> or <kbd>Shift</kbd> + <kbd>TAB</kbd> or <kbd>Space</kbd> or <kbd>Enter</kbd> to navigate and interact with the cart. [This resource on MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets) could be useful.
