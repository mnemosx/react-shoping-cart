// Media imports //
import bacon from '../media/bacon.png';
import britt from '../media/britt.png';
import irish from '../media/irish.png';
import jesus from '../media/jesus.png';
import trump from '../media/trump.png';
import unicorn from '../media/unicorn.png';
import mushroom from '../media/mushroom.png';
import shrimp from '../media/shrimp.png';
import weed from '../media/weed.png';

interface ShopItem {
  cartQuantity: number;
  quantity: number;
  name: string;
  description: string;
  price: number;
  img: string;
  discount: boolean;
}

export const items: ShopItem[] = [
  // {
  //   name: 'Bacon Air Freshener',
  //   description: 'Sizzling Bacon Aroma',
  //   price: 1.99,
  //   img: bacon,
  //   quantity: 10,
  //   cartQuantity: 0,
  //   discount: false
  // },
  // {
  //   name: 'British Accent Spray',
  //   description: 'Sound Richer, Sound Smarter!',
  //   price: 4.49,
  //   img: britt,
  //   quantity: 7,
  //   cartQuantity: 0,
  //   discount: false
  // },
  // {
  //   name: 'Irish Accent Gum',
  //   description: 'Flawless Accent & Great Taste Too!',
  //   price: 0.99,
  //   img: irish,
  //   quantity: 16,
  //   cartQuantity: 0,
  //   discount: false
  // },
  // {
  //   name: 'Jesus Bandages',
  //   description: 'JeSUs wiLL SAvE yOu!',
  //   price: 2.99,
  //   img: jesus,
  //   quantity: 34,
  //   cartQuantity: 0,
  //   discount: false
  // },
  // {
  //   name: 'Trump Toilet Paper',
  //   description: 'You Know You Want It',
  //   price: 5,
  //   img: trump,
  //   quantity: 22,
  //   cartQuantity: 0,
  //   discount: true
  // },
  // {
  //   name: 'Unicorn Horn',
  //   description: 'One Size Fits All!',
  //   price: 7.99,
  //   img: unicorn,
  //   quantity: 15,
  //   cartQuantity: 0,
  //   discount: false
  // },
  // {
  //   name: 'Mushroom Shape Lipstick',
  //   description: '"Mushroom" Shape Lipstick',
  //   price: 5.99,
  //   img: mushroom,
  //   quantity: 12,
  //   cartQuantity: 0,
  //   discount: false
  // },
  // {
  //   name: 'Shrimp Neck Pillow',
  //   description: 'Holy Shrimp! Neck pillow for long trips',
  //   price: 23.99,
  //   img: shrimp,
  //   quantity: 0,
  //   cartQuantity: 0,
  //   discount: false
  // },
  // {
  //   name: 'Weed Pillow',
  //   description: '* Not Real Weed, Stop Asking',
  //   price: 35,
  //   img: weed,
  //   quantity: 3,
  //   cartQuantity: 0,
  //   discount: false
  // },
]

export default items