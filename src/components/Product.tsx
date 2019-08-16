import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    img: {
      widht: 150,
      height: 150,
      padding: theme.spacing(1)
    },
    button: {
      margin: theme.spacing(1),
      cursor: 'pointer'
    },
    card: {
      maxWidth: 445,
    },
    close: {
      padding: theme.spacing(0.5),
    },
  }),
);

interface ProductProps {
  name: string;
  description: string;
  price: number;
  img: string;
  quantity: number;
  onSelect(): void
}

const Product: React.FC<ProductProps> = ({ name, price, img, quantity, description, onSelect }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    if (quantity < 5 && quantity > 2) {
      enqueueSnackbar(`Last ${quantity - 1} items left!`, {
        variant: 'warning',
      });
    } else if (quantity === 2) {
      enqueueSnackbar(`One item left!`, {
        variant: 'warning',
      });
    }
  };

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
        {quantity > 0 ? (<Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => { onSelect(); handleClick(); }}>
          Add to cart
          </Button>
        ) : (
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              style={{ cursor: 'default' }}>
              Sold Out
          </Button>
          )}
      </CardActions>
    </Card>
  );
}

export default Product;