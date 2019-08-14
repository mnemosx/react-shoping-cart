import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import { IconButton, Snackbar } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

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
  const [open, setOpen] = React.useState(false);

  function handleClick() {
    if (quantity < 5) {
      setOpen(true);
    }
  }

  function handleClose(event: React.SyntheticEvent | React.MouseEvent, reason?: string) {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }
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

        {quantity > 0 ? (
          <Button variant="contained" color="primary" className={classes.button}
            onClick={() => { onSelect(); handleClick(); }}>
            Add to cart
          </Button>
        ) : (
            <Button variant="contained" color="secondary" className={classes.button} style={{ cursor: 'default' }}>
              Sold Out
        </Button>
          )}


      </CardActions>
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Only few items left!</span>}
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              className={classes.close}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    </Card>
  );
}

export default Product;