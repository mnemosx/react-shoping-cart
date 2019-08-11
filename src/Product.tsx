import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    img: {
      widht: 100,
      height: 100,
      padding: theme.spacing(1)
    },
    button: {
      margin: theme.spacing(1),
      cursor: 'pointer'
    },
    card: {
      maxWidth: 445,
    },
  }),
);

interface ProductProps {
  name: string;
  description: string;
  price: number;
  img: string;
  onSelect(): void
}

const Product: React.FC<ProductProps> = ({ name, price, img, description, onSelect }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia>
          <img
            className={classes.img}
            alt={name}
            src={img}
          />
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{ width: '80%', margin: '0 auto' }}>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          ${price}
        </Typography>
        <Button variant="contained" color="primary" className={classes.button}
          onClick={() => onSelect()}>
          Add to cart
          </Button>
      </CardActions>
    </Card>

  );
}

export default Product;