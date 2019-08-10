import React from 'react'
import { Grid, Button, Paper } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
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
    }
  }),
);

interface SelectedItemProps {
  name: string;
  quantity: number;
  onRemove(): void;
}

const SelectedItem: React.FC<SelectedItemProps> = ({ name, quantity, onRemove }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Grid container spacing={6}>
        <Grid item>
          {name} {quantity} pcs.
      </Grid>
        <Grid item style={{ cursor: 'pointer' }}>
          <Button onClick={onRemove}>Remove</Button>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default SelectedItem;