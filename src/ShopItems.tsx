// Media imports //
import bacon from './media/bacon.png';
import britt from './media/britt.png';
import irish from './media/irish.png';
import jesus from './media/jesus.png';
import trump from './media/trump.png';
import unicorn from './media/unicorn.png';
import mushroom from './media/mushroom.jpg';
import shrimp from './media/shrimp.jpg';
import weed from './media/weed.jpg';

interface ShopItem {
  quantity: number;
  name: string;
  description: string;
  price: number;
  img: string;
}

export const items: ShopItem[] = [
  {
    name: 'Bacon Air Freshener',
    description: 'Sizzling Bacon Aroma',
    price: 1.99,
    img: bacon,
    quantity: 1
  },
  {
    name: 'British Accent Spray',
    description: 'Sound Richer, Sound Smarter!',
    price: 4.49,
    img: britt,
    quantity: 1
  },
  {
    name: 'Irish Accent Gum',
    description: 'Flawless Accent & Great Taste Too!',
    price: 0.99,
    img: irish,
    quantity: 1
  },
  {
    name: 'Jesus Bandages',
    description: 'JeSUs wiLL SAvE yOu!',
    price: 2.99,
    img: jesus,
    quantity: 1
  },
  {
    name: 'Trump Toilet Paper',
    description: 'You Know You Want It',
    price: 5,
    img: trump,
    quantity: 1
  },
  {
    name: 'Unicorn Horn',
    description: 'One Size Fits All!',
    price: 7.99,
    img: unicorn,
    quantity: 1
  },
  {
    name: 'Mushroom Shape Lipstick',
    description: '"Mushroom" Shape Lipstick',
    price: 5.99,
    img: mushroom,
    quantity: 1
  },
  {
    name: 'Shrimp Neck Pillow',
    description: 'Holy Shrimp! Neck pillow for long trips',
    price: 23.99,
    img: shrimp,
    quantity: 1
  },
  {
    name: 'Weed Pillow',
    description: 'Bring the whole room to life',
    price: 35,
    img: weed,
    quantity: 1
  },
]

export default items