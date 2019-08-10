import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
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
      height: 100
    },
    button: {
      margin: theme.spacing(1),
      cursor: 'pointer'
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
    <Paper className={classes.paper}>
      <Grid item container xs={12} direction="column" spacing={2}>
        <Grid item xs={12}>
          <ButtonBase>
            <img
              className={classes.img}
              alt={name}
              src={img}
            />
          </ButtonBase>
        </Grid>
        <Grid item xs>
          <Typography variant="h6">
            {name}
          </Typography>
        </Grid>
        <Grid item container spacing={2}>
          <Typography variant="h6" style={{ flexGrow: 1 }}>${price}</Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" className={classes.button}
            onClick={() => onSelect()}>
            Add to cart
          </Button>
        </Grid>
      </Grid>
    </Paper >
  );
}

export default Product;